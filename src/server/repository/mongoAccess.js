var mongoose = require('mongoose');

var MongoAccess = function () {
  mongoose.set('debug', true)
  var host = process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost";
  var port = process.env.OPENSHIFT_MONGODB_DB_PORT || "27017";
  var dbName = process.env.OPENSHIFT_APP_NAME || "spinkajs";
  var userName = process.env.OPENSHIFT_MONGODB_DB_USERNAME || "admin";
  var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "rmFTG7vgNnjy";
  
  this.connection = mongoose.createConnection('mongodb://'+userName+':'+password+'@'+host+':'+port+'/'+dbName);

}

module.exports = new MongoAccess();