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

    me.insert = function (data, callback) {
        if (Object.prototype.toString.call(data) === '[object Array]') {
            var count = 0;
            var out = [];
            data.forEach(function (doc) {
                me.schema(doc).save(function (err, record) {
                    count++;
                    out.push(record);
                    if (count === data.length) {
                        callback(null, out);
                    }
                });
            });
        } else {
            new me.schema(data).save(callback);
        }
    };
    me.insertAll = function (records, callback) {
        console.log('Inserting: %j', records);
        new me.schema.collection.insert(records, callback);
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