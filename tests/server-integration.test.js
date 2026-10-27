import { describe, it } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import handler from "../api/validate-email.js";

describe("Standalone Server Integration", () => {
  it("responds to /health check with status ok", async () => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok" }));
        return;
      }
      return handler(req, res);
    });

    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/health`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, "ok");
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it("POST /api/validate-email rejects invalid format with 400", async () => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://localhost");
      if (url.pathname === "/api/validate-email") {
        return handler(req, res);
      }
    });

    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/validate-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "invalid-email" }),
      });
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.isValid, false);
      assert.equal(data.status, "undeliverable");
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
