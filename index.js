const {Contact,Wechaty } = require('wechaty');
const QrcodeTerminal  = require('qrcode-terminal');
var hotImport  = require('hot-import');
var Koa = require('koa');
var Router = require('koa-router');
var koaBody = require('koa-body')();

var onMessage;
var account_logined = null;

async function main(){
    try {
        onMessage = await hotImport.hotImport('./on-message');
    } catch (err) {
    } finally {
    }
}

main();

let the_notfiy_men = null;

var app = new Koa();
var router = new Router();

router
    .get('/message/', (ctx,next) => {
        console.log('ctx is:',ctx.request.query);
        if (account_logined && the_notfiy_men) {
            the_notfiy_men.say(ctx.request.query.data);
            ctx.res.statusCode = 200;
            ctx.res.end();
        }
        else{
            ctx.res.statusCode = 404;
            ctx.res.end();
        }
    });
    
// router
//     .get('/carlos',koaBody, async (ctx, next) => {
//     // ctx.router available
//     console.log('dump ctx is:',ctx);
//     await next();
//     ctx.body = 'Hello World carlos';
// });

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3038);

Wechaty.instance() // Singleton
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/');
            QrcodeTerminal.generate(loginUrl);
            console.log(`${url}\n[${code}] Scan QR Code above url to log in: `);
        }
    })
    .on('login',     async  user => {
        console.log(`User ${user} logined`);
        account_logined = user;
        const contactList = await Contact.findAll();
        console.log("debug contactlist is:",contactList.length);
        contactList.forEach((value,index)=>{
            console.log('debug contact value:',value.name());
            if (value.name() === '潜龙勿庸') {
                console.log('debug values is:',value.name());
                the_notfiy_men = value;
            }
        });
    })
    .on('message', async message=>{
        // console.log('time out for hot import on mesasge:',onMessage(message,the_notfiy_men));
    })
    .start();
