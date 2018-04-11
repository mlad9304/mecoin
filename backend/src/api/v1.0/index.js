
const Router = require('koa-router');
const auth = require('./auth');
const chat = require('./chat');
const game = require('./game');
const dashboard = require('./dashboard');
const user = require('./user');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/chat', chat.routes());
api.use('/game', game.routes());
api.use('/dashboard', dashboard.routes());
api.use('/user', user.routes());

module.exports = api;