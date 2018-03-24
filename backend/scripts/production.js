'use strict';

const dotenv = require('dotenv');
dotenv.load({ path: '.env.prod' });

process.env.NODE_ENV = 'production';

var nodemon = require('nodemon');
nodemon('--exec babel-node ./src --watch ./src');
