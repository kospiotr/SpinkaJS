var express = require('express');
var morgan = require('morgan');
var router = express.Router();

var env = process.env.env || 'dev';

if('dev' === env) router.use(morgan('dev'));
router.use('/rest',require('./rest/indexRest.js'));
router.get('/', function (req, res) {
  res.send('main router');
});

module.exports = router; 