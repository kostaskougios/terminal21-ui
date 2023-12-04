import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 3000;

// Proxy configuration
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  }),
);

app.listen(port, () => {
  console.log(`**** Server listening on port ${port}`);
});
