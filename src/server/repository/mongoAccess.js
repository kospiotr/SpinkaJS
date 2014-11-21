var mongoose = require('mongoose');

var MongoAccess = function () {
  mongoose.set('debug', true)
  var host = process.env.MONGODB_DB_HOST;
  var port = process.env.MONGODB_DB_PORT;
  var dbName = process.env.APP_NAME;
  var userName = process.env.MONGODB_DB_USERNAME;
  var password = process.env.MONGODB_DB_PASSWORD;
  var credentials = userName && password ? userName+':'+password+'@' : '';
  var connection = 'mongodb://'+credentials + host+':'+port+'/'+dbName;
  
  console.log('Connection: ' + connection);
  this.connection = mongoose.createConnection(connection);

}

module.exports = new MongoAccess();