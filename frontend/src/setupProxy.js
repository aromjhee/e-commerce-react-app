const { createProxyMiddleware } = require('http-proxy-middleware');
// const { PORT } = require('../../backend/config.js');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:8080`,
      changeOrigin: true,
    })
  );
};