var mongoose = require('mongoose');

var MongoAccess = function () {
    var host = process.env.MONGODB_DB_HOST || "localhost";
    var port = process.env.MONGODB_DB_PORT || "27017";
    var dbName = process.env.APP_NAME || "spinkajs";
    var userName = process.env.MONGODB_DB_USERNAME;
    var password = process.env.MONGODB_DB_PASSWORD;
    var credentials = userName && password ? userName + ':' + password + '@' : '';
    var connection = 'mongodb://' + credentials + host + ':' + port + '/' + dbName;
    var debuggingMongo = process.env.MONGODB_DEBUG || false;

    mongoose.set('debug', debuggingMongo);
    this.connection = mongoose.createConnection(connection);
}

module.exports = new MongoAccess();