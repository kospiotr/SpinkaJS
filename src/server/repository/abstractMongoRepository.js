var _ = require('underscore');
var ObjectId = require('mongoose').Types.ObjectId;

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

    me.update = function (id, record, callback) {
        delete record._id;
        me.schema.update({_id: new ObjectId(id)}, record, {}, callback);
    };

    me.remove = function (id, callback) {
        me.schema.findById(id, function (err, record) {
            record.remove(callback);
        });
    };
}

module.exports = AbstractMongoRepository;