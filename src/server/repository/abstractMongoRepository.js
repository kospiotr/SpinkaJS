var _ = require('underscore');

var AbstractMongoRepository = function () {

  var me = this;

  me.findAll = function (callback) {
    me.schema.find(callback);
  };

  me.getById = function (id, callback) {
    me.schema.findById(id, callback);
  };

  me.insert = function (record, callback) {
    new me.schema(record).save(callback);
  };

  me.save = function (id, record, callback) {
    if (id == null) {
      me.insert(record, callback);
    } else {
      me.getById(id, function (err, dbRecord) {
        if (dbRecord == null) {
          me.insert(record, callback);
        } else {
          _.extend(dbRecord, record).save(callback);
        }
      });
    }
    ;
  }
}

module.exports = AbstractMongoRepository;