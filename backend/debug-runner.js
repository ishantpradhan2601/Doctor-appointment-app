import { spawn } from 'child_process';
import fs from 'fs';

const log = fs.createWriteStream('./backend_debug.log');
const child = spawn('node', ['server.js'], {
    stdio: ['inherit', log, log]
});

child.on('error', (err) => {
    fs.appendFileSync('./backend_debug.log', `\nChild process error: ${err.message}\n`);
});

child.on('exit', (code) => {
    fs.appendFileSync('./backend_debug.log', `\nChild process exited with code ${code}\n`);
});

setTimeout(() => {
    console.log('Stopping debug runner after 10s');
    child.kill();
    process.exit(0);
}, 10000);
