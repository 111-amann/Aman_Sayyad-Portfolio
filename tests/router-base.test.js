import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

describe("Deployment Target Basename & Asset Base Resolution", () => {
  // Pure logic test for router basename
  function resolveRouterBasename(viteBasePath, baseUrl) {
    const rawBase = viteBasePath || baseUrl || "/";
    return rawBase === "/" || rawBase === ""
      ? "/"
      : `/${rawBase.replace(/^\/+|\/+$/g, "")}`;
  }

  it("resolves router basename to '/' for Vercel and local root builds", () => {
    assert.equal(resolveRouterBasename(undefined, "/"), "/");
    assert.equal(resolveRouterBasename("", "/"), "/");
    assert.equal(resolveRouterBasename("/", "/"), "/");
  });

  it("resolves router basename to '/Aman_Sayyad-Portfolio' for GitHub Pages", () => {
    assert.equal(
      resolveRouterBasename("/Aman_Sayyad-Portfolio", "/Aman_Sayyad-Portfolio/"),
      "/Aman_Sayyad-Portfolio"
    );
    assert.equal(
      resolveRouterBasename(undefined, "/Aman_Sayyad-Portfolio/"),
      "/Aman_Sayyad-Portfolio"
    );
    assert.equal(
      resolveRouterBasename("/Aman_Sayyad-Portfolio/", "/Aman_Sayyad-Portfolio/"),
      "/Aman_Sayyad-Portfolio"
    );
  });

  it("verifies Vercel production build output uses root assets ('/assets/')", () => {
    // Run default build (Vercel command)
    execSync("npm run build", { stdio: "pipe" });

    const indexPath = path.resolve(process.cwd(), "dist", "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");

    // Assets must be referenced at root "/assets/"
    assert.match(html, /src="\/assets\//);
    assert.equal(html.includes("/Aman_Sayyad-Portfolio/assets/"), false);
  });

  it("verifies GitHub Pages build output uses repo asset base ('/Aman_Sayyad-Portfolio/assets/')", () => {
    // Run GitHub Pages build
    execSync("npm run build:gh-pages", { stdio: "pipe" });

    const indexPath = path.resolve(process.cwd(), "dist", "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");

    // Assets must be referenced with the GitHub Pages base prefix
    assert.match(html, /src="\/Aman_Sayyad-Portfolio\/assets\//);
  });
});
