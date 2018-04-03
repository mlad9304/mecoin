import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';

import echo from './echo';
import game from './game';

import bodyParser from 'koa-bodyparser';

import gameEngine from 'engine/gameEngine';
// import db from './db';

const koaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');

// db connect
const db = require('./db');
db.connect();

// initialise game 
gameEngine.init();

// create app for koa
const app = new Koa();
const router = new Router();

const frontendBuild = path.join(__dirname, '../public');
const indexPagePath = path.join(frontendBuild, 'index.html');
const indexPage = fs.readFileSync(indexPagePath);

// CORS
app.use((ctx, next) => {
  const allowedHosts = [
    'localhost',
    'https://mecoin.herokuapp.com',
    'mecoin.herokuapp.com',
    '18.217.60.113'
  ];
  const origin = ctx.header['origin'];
  allowedHosts.every(el => {
    if(!origin) return false;
    if(origin.indexOf(el) !== -1) {
      ctx.response.set('Access-Control-Allow-Origin', origin);
      return false;
    }
    return true;
  });
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-timebase, Link');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  ctx.set('Access-Control-Expose-Headers', 'Link');
  return next();
});

/* SETUP MIDDLEWARE */
// var bodyParser = require('koa-bodyparser');
const jwtMiddleware = require('lib/middlewares/jwt');

app.use(bodyParser()); //parse json
app.use(jwtMiddleware);


// set route for api
const api = require('./api');
router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 5000;

var server = http.createServer(app.callback());
// echo.installHandlers(server, { prefix: '/echo' });
game.installHandlers(server, { prefix: '/game' });
echo.installHandlers(server, { prefix: '/echo'});

app.use(koaStatic(frontendBuild));
app.use((ctx) => {
  ctx.body = indexPage.toString();
});

server.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});