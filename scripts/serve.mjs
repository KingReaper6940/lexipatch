import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const allowed=['index.html','style.css','favicon.svg','chevron.svg',...['model','generate','audit','example','exports','files','app'].map(n=>'src/'+n+'.mjs')],types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',svg:'image/svg+xml',mjs:'text/javascript; charset=utf-8'};
createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';if(!['GET','HEAD'].includes(req.method)||!allowed.includes(path)){res.writeHead(404);return res.end('Not found')}try{const bytes=await readFile(resolve('dist',path));res.writeHead(200,{'Content-Type':types[path.split('.').at(-1)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:bytes)}catch{res.writeHead(404);res.end('Run npm run build first')}}).listen(4219,'127.0.0.1',()=>console.log('Lexipatch: http://127.0.0.1:4219'));
