
const Router = require('koa-router');

const game = new Router();
const gameCtrl = require('./game.ctrl');
const needAuth = require('lib/middlewares/needAuth');

game.get('/', (ctx) => {
  ctx.body = {
    message: 'ok'
  };
});

game.get('/find/type/:type', gameCtrl.findGame);
game.get('/create/type/:type', needAuth, gameCtrl.createGame);
game.post('/deposit', needAuth, gameCtrl.deposit);
game.post('/gameroominfo', gameCtrl.getGameRoomInfo);


module.exports = game;