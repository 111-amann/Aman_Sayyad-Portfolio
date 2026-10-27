import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import handler from "./api/validate-email.js";

// Load .env locally if present and not already provided
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (parsedUrl.pathname === "/api/validate-email") {
    return handler(req, res);
  }

  // Health check endpoint
  if (parsedUrl.pathname === "/" || parsedUrl.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "portfolio-email-validator" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log(`Email validation server running on http://localhost:${PORT}`);
});
