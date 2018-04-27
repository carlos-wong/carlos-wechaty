const {Contact,Wechaty } = require('wechaty');

async function debugconcat(){
    
}

module.exports.default = async (message,notifyman) => {
    // message.say('hello');
    console.log('debug on mesage function message:',message.rawObj.sendByLocal);
    if(notifyman && !message.rawObj.sendByLocal){
        notifyman.say('hello');
    }
    
    return 1;
};
