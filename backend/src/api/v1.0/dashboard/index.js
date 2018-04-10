const Router = require('koa-router');

const dashboard = new Router();
const dashboardCtrl = require('./dashboard.ctrl');
const needAuth = require('lib/middlewares/needAuth');

// dashboard.get('/balance/userid/:userid', needAuth, dashboardCtrl.getBalance);
dashboard.get('/balance/userid/:userid', dashboardCtrl.getBalance);


module.exports = dashboard;