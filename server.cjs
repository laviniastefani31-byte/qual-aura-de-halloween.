
const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 5173;
const root = __dirname;

const types = {
  ".html":"text/html; charset=utf-8",
  ".png":"image/png",
  ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",
  ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8"
};

http.createServer((req,res)=>{
  let url = decodeURIComponent(req.url.split("?")[0]);
  if(url === "/") url = "/index.html";
  const file = path.join(root, url.replace(/^\/+/, ""));
  if(!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()){
    res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"});
    return res.end("404");
  }
  res.writeHead(200, {"Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream"});
  fs.createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", ()=>{
  console.log(`\n🎃 Qual Aura de Halloween você seria?`);
  console.log(`🦊 http://localhost:${port}\n`);
});
