var mongoose = require('mongoose');

var MongoAccess = function () {
  mongoose.set('debug', true)
  this.connection = mongoose.createConnection('mongodb://admin:rmFTG7vgNnjy@localhost:27017/spinkajs'); // connect to our database

}

module.exports = new MongoAccess();