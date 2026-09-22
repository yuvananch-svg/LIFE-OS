import {spawn} from 'node:child_process';
const port=3107; const server=spawn('npm',['run','start','--','-H','127.0.0.1','-p',String(port)],{stdio:'ignore'});
try { for(let i=0;i<30;i++){try{const res=await fetch(`http://127.0.0.1:${port}/login`);if(res.status===200)break}catch{} await new Promise(r=>setTimeout(r,300));}
  const get=path=>fetch(`http://127.0.0.1:${port}${path}`,{redirect:'manual'});
  const login=await get('/login'); if(login.status!==200) throw new Error(`/login ${login.status}`);
  const offline=await get('/offline'); if(offline.status!==200) throw new Error(`/offline ${offline.status}`);
  const today=await get('/today'); if(![307,308].includes(today.status)||!today.headers.get('location')?.includes('/login')) throw new Error(`/today did not redirect (${today.status})`);
  const callback=await get('/callback'); if(![307,308].includes(callback.status)||!callback.headers.get('location')?.includes('missing_code')) throw new Error(`/callback missing-code behavior failed (${callback.status})`);
  console.log('route smoke passed: login, offline, protected today, callback missing-code');
} finally {server.kill('SIGTERM')}
