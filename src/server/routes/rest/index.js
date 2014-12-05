var express = require('express');
var router = express.Router();

router.use('/scientist',require('./scientistRest.js'));

module.exports = router; 