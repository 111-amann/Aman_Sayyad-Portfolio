/**
 * Backend Email Validation Endpoint
 *
 * Integrates with Abstract Email Reputation API:
 * https://emailreputation.abstractapi.com/v1/
 *
 * Requirements:
 * - ABSTRACT_API_KEY must never be returned in responses or logged
 * - Provides CORS headers for GitHub Pages origin and local dev
 * - Performs format validation before external calls
 * - In-memory caching and basic rate limiting to protect API credits
 * - Returns only the verification fields needed by frontend
 */

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 15; // max 15 requests/min per IP

const cache = new Map();
const rateLimitMap = new Map();

// Simplified RFC-compliant email regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Clean up expired cache and rate limit entries
 */
function cleanupExpired() {
  const now = Date.now();
  for (const [key, item] of cache.entries()) {
    if (now - item.timestamp > CACHE_TTL_MS) {
      cache.delete(key);
    }
  }
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}

/**
 * Check if IP exceeds rate limit
 */
function isRateLimited(clientIp) {
  if (!clientIp) return false;
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

/**
 * Determine allowed origin for CORS
 */
function getCorsOrigin(requestOrigin) {
  if (!requestOrigin) return "*";

  const allowedOrigins = [
    "https://111-amann.github.io",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:4173",
  ];

  if (
    allowedOrigins.includes(requestOrigin) ||
    requestOrigin.endsWith(".github.io")
  ) {
    return requestOrigin;
  }

  // Fallback to portfolio origin
  return "https://111-amann.github.io";
}

/**
 * Parse JSON body from request across different runtime environments
 */
async function parseRequestBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.length > 0) {
    try {
      return JSON.parse(req.body);
    } catch {
      throw new Error("Invalid JSON body");
    }
  }

  // Handle native Node.js IncomingMessage stream
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 50000) {
        // 50KB safety limit
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

/**
 * Send JSON response supporting both Vercel/Express and native Node HTTP
 */
function sendJsonResponse(res, statusCode, data, headers = {}) {
  const jsonString = JSON.stringify(data);
  const responseHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (typeof res.status === "function" && typeof res.json === "function") {
    Object.entries(responseHeaders).forEach(([key, val]) => {
      res.setHeader(key, val);
    });
    return res.status(statusCode).json(data);
  }

  res.writeHead(statusCode, responseHeaders);
  res.end(jsonString);
}

/**
 * Core validation logic against Abstract Email Reputation API
 */
export async function verifyEmailWithAbstractApi(
  email,
  apiKey,
  options = {}
) {
  const fetchFn = options.fetchFn || globalThis.fetch;
  const timeoutMs = options.timeoutMs || 8000;

  // Construct target URL
  const targetUrl = new URL("https://emailreputation.abstractapi.com/v1/");
  targetUrl.searchParams.set("api_key", apiKey);
  targetUrl.searchParams.set("email", email);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetchFn(targetUrl.toString(), {
      method: "GET",
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      return {
        success: false,
        statusCode: 503,
        error: "Email verification request timed out",
        unavailable: true,
      };
    }
    return {
      success: false,
      statusCode: 503,
      error: "Unable to reach email verification provider",
      unavailable: true,
    };
  } finally {
    clearTimeout(timeoutId);
  }

  // Handle Abstract API HTTP response status codes
  if (response.status === 401) {
    // Missing or invalid API key
    return {
      success: false,
      statusCode: 503,
      error: "Email verification service configuration error",
      unavailable: true,
    };
  }

  if (response.status === 422) {
    // Insufficient credits / quota reached
    return {
      success: false,
      statusCode: 503,
      error: "Email verification service quota reached",
      unavailable: true,
    };
  }

  if (response.status === 429) {
    // Upstream rate limit reached
    return {
      success: false,
      statusCode: 503,
      error: "Email verification service is temporarily busy",
      unavailable: true,
    };
  }

  if (!response.ok) {
    return {
      success: false,
      statusCode: 503,
      error: "Email verification upstream service error",
      unavailable: true,
    };
  }

  let data;
  try {
    data = await response.json();
  } catch {
    return {
      success: false,
      statusCode: 503,
      error: "Malformed response from verification service",
      unavailable: true,
    };
  }

  // Parse according to Abstract API Email Reputation schema
  const deliverability = data.email_deliverability || {};
  const quality = data.email_quality || {};

  const status = deliverability.status || "unknown"; // 'deliverable' | 'undeliverable' | 'risky' | 'unknown'
  const statusDetail = deliverability.status_detail || "";
  const isFormatValid = deliverability.is_format_valid ?? true;
  const isMxValid = deliverability.is_mx_valid ?? false;
  const isSmtpValid = deliverability.is_smtp_valid ?? false;
  const isDisposable = quality.is_disposable ?? false;
  const suggestedCorrection = data.suggested_correction || null;

  // Deliverable requires valid format, valid MX records, and deliverable status
  const isValid =
    status === "deliverable" &&
    isFormatValid &&
    isMxValid &&
    isSmtpValid !== false;

  return {
    success: true,
    statusCode: 200,
    data: {
      isValid,
      status,
      statusDetail,
      suggestedCorrection,
      isFormatValid,
      isMxValid,
      isSmtpValid,
      isDisposable,
    },
  };
}

/**
 * Serverless / HTTP Request Handler
 */
export default async function handler(req, res) {
  cleanupExpired();

  const originHeader = req.headers?.origin || req.headers?.referer || "";
  const corsOrigin = getCorsOrigin(originHeader);

  const corsHeaders = {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };

  // Preflight OPTIONS handling
  if (req.method === "OPTIONS") {
    if (typeof res.status === "function") {
      Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(204).end();
    }
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    return sendJsonResponse(
      res,
      405,
      { error: "Method not allowed. Use POST." },
      corsHeaders
    );
  }

  // Rate limiting by client IP
  const clientIp =
    req.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "127.0.0.1";

  if (isRateLimited(clientIp)) {
    return sendJsonResponse(
      res,
      429,
      {
        error: "Too many requests. Please wait a moment before trying again.",
        unavailable: true,
      },
      corsHeaders
    );
  }

  // Parse JSON body
  let body;
  try {
    body = await parseRequestBody(req);
  } catch {
    return sendJsonResponse(
      res,
      400,
      { error: "Malformed request body. Expected JSON." },
      corsHeaders
    );
  }

  // Validate email field presence and type
  const rawEmail = body?.email;
  if (typeof rawEmail !== "string" || !rawEmail.trim()) {
    return sendJsonResponse(
      res,
      400,
      {
        error: "The email field is required and must be a string.",
        isValid: false,
        status: "undeliverable",
      },
      corsHeaders
    );
  }

  const email = rawEmail.trim().toLowerCase();

  // Basic email format check
  if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    return sendJsonResponse(
      res,
      400,
      {
        error: "Invalid email format",
        isValid: false,
        status: "undeliverable",
        statusDetail: "invalid_format",
        isFormatValid: false,
        isMxValid: false,
        isSmtpValid: false,
      },
      corsHeaders
    );
  }

  // Check cache for recent result
  const cached = cache.get(email);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return sendJsonResponse(res, 200, cached.data, corsHeaders);
  }

  // Retrieve protected Abstract API key from environment
  const apiKey = process.env.ABSTRACT_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return sendJsonResponse(
      res,
      503,
      {
        error: "Email verification service is temporarily unconfigured.",
        unavailable: true,
      },
      corsHeaders
    );
  }

  // Call Abstract API
  const result = await verifyEmailWithAbstractApi(email, apiKey);

  if (!result.success) {
    return sendJsonResponse(
      res,
      result.statusCode || 503,
      {
        error: result.error || "Email verification service unavailable",
        unavailable: true,
      },
      corsHeaders
    );
  }

  // Save successful response in memory cache
  cache.set(email, {
    data: result.data,
    timestamp: Date.now(),
  });

  return sendJsonResponse(res, 200, result.data, corsHeaders);
}
