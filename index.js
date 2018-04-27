const { Wechaty } = require('wechaty'); // import { Wechaty } from 'wechaty'
const QrcodeTerminal  = require('qrcode-terminal');

async function handle_message(message){
    console.log('message is:',message);
}

Wechaty.instance() // Singleton
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/');
            QrcodeTerminal.generate(loginUrl);
        }
        console.log(`${url}\n[${code}] Scan QR Code above url to log in: `);
    })
    .on('login',       user => console.log(`User ${user} logined`))
    .on('message',  message => {
        handle_message(message);
    })
    .start();
