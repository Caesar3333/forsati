const http = require("http");

const PORT = Number(process.env.PORT || 3001);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Forsati Resume Service</title>
    <style>
      body {
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        background: #f8fafc;
        color: #0f172a;
        margin: 0;
        padding: 40px;
      }
      .card {
        max-width: 720px;
        margin: 0 auto;
        background: #fff;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        padding: 24px;
      }
      h1 {
        margin: 0 0 12px;
      }
      p {
        margin: 0 0 12px;
        color: #475569;
      }
      code {
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 6px;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Forsati Resume Service (Stub)</h1>
      <p>This is a placeholder service for local routing only.</p>
      <p>Health: <code>/health</code> | Ready: <code>/ready</code></p>
      <p>Replace with a real resume builder when available.</p>
    </div>
  </body>
</html>`;

function respondJson(res, payload, statusCode = 200) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/health") {
    return respondJson(res, { status: "ok", service: "resume-service" });
  }
  if (url.pathname === "/ready") {
    return respondJson(res, { status: "ready", service: "resume-service" });
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Forsati resume service stub running on ${PORT}`);
});
