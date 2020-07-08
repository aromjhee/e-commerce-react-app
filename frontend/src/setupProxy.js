import proxy from "http-proxy-middleware";
import { PORT } from '../backend/config.js';

const app = (app) => {
  app.use(proxy("/api/*", { target: `http://localhost:${PORT}/` }));
};

export default app;