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
    base:
    mode === "github-pages"
      ? "/Aman_Sayyad-Portfolio/"
      : "/",
  };
});
