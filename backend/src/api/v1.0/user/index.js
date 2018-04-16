const Router = require('koa-router');

const user = new Router();
const userCtrl = require('./user.ctrl');
const needAuth = require('lib/middlewares/needAuth');

user.get('/', (ctx) => {
  ctx.body = 'routing setting is OK';
});


user.post('/update/info', needAuth, userCtrl.updateInfo);
user.post('/update/email', needAuth, userCtrl.updateEmail);
user.post('/update/password', needAuth, userCtrl.updatePassword);

module.exports = user;