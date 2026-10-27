import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import emailValidateHandler from "./api/validate-email.js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.ABSTRACT_API_KEY && !process.env.ABSTRACT_API_KEY) {
    process.env.ABSTRACT_API_KEY = env.ABSTRACT_API_KEY;
  }

  // Base path resolution:
  // 1. Explicit VITE_BASE_PATH environment variable (e.g. "/Aman_Sayyad-Portfolio")
  // 2. Build mode "github-pages" -> "/Aman_Sayyad-Portfolio/"
  // 3. Default for Vercel and local dev -> "/"
  const rawBasePath =
    env.VITE_BASE_PATH ||
    (mode === "github-pages" ? "/Aman_Sayyad-Portfolio" : "/");

  const assetBase =
    rawBasePath === "/"
      ? "/"
      : `/${rawBasePath.replace(/^\/+|\/+$/g, "")}/`;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "local-email-validate-middleware",
        configureServer(server) {
          server.middlewares.use("/api/validate-email", async (req, res) => {
            await emailValidateHandler(req, res);
          });
        },
      },
    ],
    base: assetBase,
  };
});
