import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import handler, {
  verifyEmailWithAbstractApi,
} from "../api/validate-email.js";

// Helper to simulate Node HTTP req & res
function createMockHttp({ method = "POST", url = "/api/validate-email", headers = {}, body = null }) {
  const req = {
    method,
    url,
    headers: {
      origin: "https://111-amann.github.io",
      "content-type": "application/json",
      ...headers,
    },
    body,
  };

  const res = {
    statusCode: null,
    headers: {},
    body: null,
    setHeader(key, val) {
      this.headers[key.toLowerCase()] = val;
    },
    writeHead(code, headers = {}) {
      this.statusCode = code;
      Object.entries(headers).forEach(([k, v]) => {
        this.headers[k.toLowerCase()] = v;
      });
    },
    end(data) {
      this.body = data ? JSON.parse(data) : null;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };

  return { req, res };
}

describe("Abstract API Email Validation - Backend Endpoint & Logic", () => {
  const _originalEnvKey = process.env.ABSTRACT_API_KEY;

  beforeEach(() => {
    process.env.ABSTRACT_API_KEY = "test_mock_abstract_key";
  });

  after(() => {
    process.env.ABSTRACT_API_KEY = _originalEnvKey;
  });

  // Scenario 1: Empty email field
  it("Scenario 1: returns HTTP 400 when email field is missing or empty", async () => {
    const { req, res } = createMockHttp({
      body: { email: "" },
    });

    await handler(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.isValid, false);
    assert.equal(res.body.status, "undeliverable");
    assert.match(res.body.error, /required/i);
  });

  // Scenario 2: Malformed email such as aman@gmail
  it("Scenario 2: returns HTTP 400 for malformed email (aman@gmail) without external call", async () => {
    const { req, res } = createMockHttp({
      body: { email: "aman@gmail" },
    });

    await handler(req, res);

    assert.equal(res.statusCode, 400);
    assert.equal(res.body.isValid, false);
    assert.equal(res.body.isFormatValid, false);
    assert.equal(res.body.statusDetail, "invalid_format");
  });

  // Scenario 3: Email at a nonexistent domain (mocked Abstract API response)
  it("Scenario 3: handles nonexistent domain with undeliverable status", async () => {
    const mockFetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        email_address: "test@nonexistentdomain123xyz.com",
        suggested_correction: null,
        email_deliverability: {
          status: "undeliverable",
          status_detail: "dns_record_not_found",
          is_format_valid: true,
          is_smtp_valid: false,
          is_mx_valid: false,
          mx_records: [],
        },
        email_quality: {
          score: 0.1,
          is_disposable: false,
        },
      }),
    });

    const result = await verifyEmailWithAbstractApi(
      "test@nonexistentdomain123xyz.com",
      "test_key",
      { fetchFn: mockFetch }
    );

    assert.equal(result.success, true);
    assert.equal(result.data.isValid, false);
    assert.equal(result.data.status, "undeliverable");
    assert.equal(result.data.isMxValid, false);
    assert.equal(result.data.statusDetail, "dns_record_not_found");
  });

  // Scenario 4: Deliverable email address
  it("Scenario 4: returns isValid: true for confirmed deliverable email", async () => {
    const mockFetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        email_address: "valid.user@example.com",
        suggested_correction: null,
        email_deliverability: {
          status: "deliverable",
          status_detail: "valid_email",
          is_format_valid: true,
          is_smtp_valid: true,
          is_mx_valid: true,
          mx_records: ["mail.example.com"],
        },
        email_quality: {
          score: 0.95,
          is_disposable: false,
        },
      }),
    });

    const result = await verifyEmailWithAbstractApi(
      "valid.user@example.com",
      "test_key",
      { fetchFn: mockFetch }
    );

    assert.equal(result.success, true);
    assert.equal(result.data.isValid, true);
    assert.equal(result.data.status, "deliverable");
    assert.equal(result.data.isFormatValid, true);
    assert.equal(result.data.isMxValid, true);
    assert.equal(result.data.isSmtpValid, true);
  });

  // Scenario 5: Inconclusive verification result (risky / catch-all)
  it("Scenario 5: returns isValid: false and status: risky for inconclusive check", async () => {
    const mockFetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        email_address: "info@ambiguous-domain.com",
        suggested_correction: null,
        email_deliverability: {
          status: "risky",
          status_detail: "catchall",
          is_format_valid: true,
          is_smtp_valid: true,
          is_mx_valid: true,
          mx_records: ["mail.ambiguous-domain.com"],
        },
        email_quality: {
          score: 0.5,
          is_disposable: false,
          is_catchall: true,
        },
      }),
    });

    const result = await verifyEmailWithAbstractApi(
      "info@ambiguous-domain.com",
      "test_key",
      { fetchFn: mockFetch }
    );

    assert.equal(result.success, true);
    assert.equal(result.data.isValid, false);
    assert.equal(result.data.status, "risky");
  });

  // Scenario 6: Invalid API key (HTTP 401 from Abstract)
  it("Scenario 6: returns HTTP 503 unavailable when API key is rejected", async () => {
    const mockFetch = async () => ({
      ok: false,
      status: 401,
      json: async () => ({
        error: { code: 401, message: "Unauthorized" },
      }),
    });

    const result = await verifyEmailWithAbstractApi(
      "user@example.com",
      "bad_key",
      { fetchFn: mockFetch }
    );

    assert.equal(result.success, false);
    assert.equal(result.statusCode, 503);
    assert.equal(result.unavailable, true);
  });

  // Scenario 7: API quota exhausted (HTTP 422 from Abstract)
  it("Scenario 7: returns HTTP 503 with quota reached message on 422", async () => {
    const mockFetch = async () => ({
      ok: false,
      status: 422,
      json: async () => ({
        error: { code: 422, message: "Insufficient API credits" },
      }),
    });

    const result = await verifyEmailWithAbstractApi(
      "user@example.com",
      "key",
      { fetchFn: mockFetch }
    );

    assert.equal(result.success, false);
    assert.equal(result.statusCode, 503);
    assert.equal(result.unavailable, true);
    assert.match(result.error, /quota/i);
  });

  // Scenario 8: Backend / upstream unavailable / timeout
  it("Scenario 8: returns HTTP 503 unavailable on fetch timeout or connection error", async () => {
    const mockFetch = async () => {
      const err = new Error("Connection failed");
      err.name = "AbortError";
      throw err;
    };

    const result = await verifyEmailWithAbstractApi(
      "user@example.com",
      "key",
      { fetchFn: mockFetch }
    );

    assert.equal(result.success, false);
    assert.equal(result.statusCode, 503);
    assert.equal(result.unavailable, true);
    assert.match(result.error, /timed out/i);
  });

  // Scenario 9: CORS and OPTIONS preflight check
  it("handles CORS OPTIONS preflight and sets headers", async () => {
    const { req, res } = createMockHttp({
      method: "OPTIONS",
      headers: { origin: "https://111-amann.github.io" },
    });

    await handler(req, res);

    assert.equal(res.statusCode, 204);
    assert.equal(
      res.headers["access-control-allow-origin"],
      "https://111-amann.github.io"
    );
    assert.match(res.headers["access-control-allow-methods"], /POST/);
  });

  // Scenario 10: Security check - API key is never in response
  it("Security check: never leaks ABSTRACT_API_KEY in response payload", async () => {
    const { req, res } = createMockHttp({
      body: { email: "malformed-no-domain" },
    });

    await handler(req, res);

    const stringified = JSON.stringify(res.body);
    assert.equal(stringified.includes("test_mock_abstract_key"), false);
  });
});
