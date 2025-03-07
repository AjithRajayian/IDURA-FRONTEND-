import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const proxy_url =
    process.env.VITE_DEV_REMOTE === "remote"
      ? process.env.VITE_BACKEND_SERVER
      : "https://idura-backend.onrender.com/";

  return defineConfig({
    plugins: [react()],
    root: ".", // Ensures Vite finds index.html in the root folder
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist", // Output directory for production build
      rollupOptions: {
        input: "index.html", // Explicitly setting index.html as entry point
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: proxy_url,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
