const {Contact,Wechaty } = require('wechaty');
const QrcodeTerminal  = require('qrcode-terminal');
var hotImport  = require('hot-import');

var onMessage;

async function main(){
    try {
        onMessage = await hotImport.hotImport('./on-message');
    } catch (err) {
    } finally {
    }
}

main();

let the_notfiy_men = null;

Wechaty.instance() // Singleton
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/');
            QrcodeTerminal.generate(loginUrl);
        }
        console.log(`${url}\n[${code}] Scan QR Code above url to log in: `);
    })
    .on('login',     async  user => {
        console.log(`User ${user} logined`);
        const contactList = await Contact.findAll();
        console.log("debug contactlist is:",contactList.length);
        contactList.forEach((value,index)=>{
            if (value.name() === '潜龙勿庸') {
                console.log('debug values is:',value.name());
                the_notfiy_men = value;
            }
        });
    })
    .on('message', async message=>{
        console.log('time out for hot import on mesasge:',onMessage(message,the_notfiy_men));
    })
    .start();
