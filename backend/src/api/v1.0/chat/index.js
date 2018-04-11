const Router = require('koa-router');

const chat = new Router();
const chatCtrl = require('./chat.ctrl');

chat.get('/broadcast', chatCtrl.getRecentMsg);

// auth.get('/exists/email/:email', authCtrl.checkEmail);
// auth.get('/exists/username/:username', authCtrl.checkUsername);

module.exports = chat;