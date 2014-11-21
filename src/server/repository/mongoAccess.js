var mongoose = require('mongoose');

var MongoAccess = function () {
  mongoose.set('debug', true)
  var host = process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost";
  console.log('');
  var port = process.env.OPENSHIFT_MONGODB_DB_PORT || "27017";
  var dbName = process.env.OPENSHIFT_APP_NAME || "spinkajs";
  var userName = process.env.OPENSHIFT_MONGODB_DB_USERNAME || "admin";
  var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "rmFTG7vgNnjy";
  
  var connectionUrl = 'mongodb://'+userName+':'+password+'@'+host+':'+port+'/'+dbName;
  console.log('Original connection: ' + connectionUrl);
  this.connection = mongoose.createConnection(connectionUrl);

  var host2 = process.env.MONGODB_DB_HOST;
  var port2 = process.env.MONGODB_DB_PORT;
  var dbName2 = process.env.APP_NAME;
  var userName2 = process.env.MONGODB_DB_USERNAME;
  var password2 = process.env.MONGODB_DB_PASSWORD;
  var credentials2 = userName2 && password2 ? userName2+':'+password2+'@' : '';
  var secondaryConnection = 'mongodb://'+credentials2 + host2+':'+port2+'/'+dbName2;
  console.log('Secondary connection: ' + secondaryConnection);
}

module.exports = new MongoAccess();