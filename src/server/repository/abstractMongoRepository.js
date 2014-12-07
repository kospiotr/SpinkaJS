var _ = require('underscore');
var async = require('async');
var ObjectId = require('mongoose').Types.ObjectId;

var AbstractMongoRepository = function () {

    var me = this;

    me.findAll = function (conditions, fields, options, callback) {
        me.schema.find(null, null, options, function (err, data) {
            if (!options.showTotal) {
                callback(err, {data: data});
            } else {
                me.schema.count(conditions, function (err, count) {
                    callback(err, {data: data, total: count});
                });
            }
        });
    };

    me.getById = function (id, callback) {
        me.schema.findById(id, callback);
    };

    me.insert = function (data, mainCallback) {
        console.log('inserting data: %j', data);
        if (data == null) {
            return mainCallback(null, null);
        }
        if (Object.prototype.toString.call(data) === '[object Array]') {
            me.insertMultiple(data, mainCallback);
        } else {
            me.insertSingle(data, mainCallback);
        }
    };

    me.insertSingle = function (record, mainCallback) {
        console.log('Inserting silngle: ' + record);
        if (record == null) {
            return mainCallback(null, null);
        }
        ;
        delete record._id;
        new me.schema(record).save(mainCallback);
    };

    me.insertMultiple = function (records, mainCallback) {
        if (records.length == null) {
            return mainCallback(null, []);
        }
        var count = 0;
        var out = [];
        var tasks = [];

        records.forEach(function (record) {
            delete record._id;
            tasks.push(function (callback) {
                me.schema(record).save(function (err, record) {
                    count++;
                    out.push(record);
                    callback();
                });
            });
        });

        var onDone = function (err) {
            if (err) {
                throw err;
            }
            return mainCallback(null, out);
        };

        async.parallel(tasks, onDone);
    };

    me.update = function (data, mainCallback) {
        console.log('updating data: %j', data);
        if (data == null) {
            return mainCallback(null, null);
        }
        if (Object.prototype.toString.call(data) === '[object Array]') {
            me.updateMultiple(data, mainCallback);
        } else {
            me.updateSingle(data, mainCallback);
        }
    };

    me.updateSingle = function (record, mainCallback) {
        console.log('Updating silngle: %j', record);
        if (record == null) {
            return mainCallback(null, null);
        }
        ;
        var id = record._id;
        delete record._id;
        me.schema.update({_id: new ObjectId(id)}, record, {}, mainCallback);
    };

    me.updateMultiple = function (records, mainCallback) {
        console.log('Updating multiple: %j', records);
        if (records.length == null) {
            return mainCallback(null, []);
        }
        var count = 0;
        var out = [];
        var tasks = [];

        records.forEach(function (record) {

            var id = record._id;
            delete record._id;
            tasks.push(function (callback) {
                me.schema.update({_id: new ObjectId(id)}, record, {},
                        function (err, record) {
                            count++;
                            out.push(record);
                            callback();
                        });
            });
        });

        var onDone = function (err) {
            if (err) {
                throw err;
            }
            return mainCallback(null, out);
        };

        async.parallel(tasks, onDone);
    };

//    me.updateSingle = function (id, record, callback) {
//        delete record._id;
//        me.schema.update({_id: new ObjectId(id)}, record, {}, callback);
//    };

    me.remove = function (data, mainCallback) {
        if (Object.prototype.toString.call(data) === '[object Array]') {
            var ids = data;
            var count = 0;

            me.schema.find({_id: {$in: ids}}, function (err, docs) {
                var onDone = function (err) {
                    if (err) {
                        throw err; //Or pass it on to an outer callback, log it or whatever suits your needs
                    }
                    mainCallback(count);
                };

                var tasks = [];
                _.each(docs, function (record) {
                    tasks.push(function (callback) {
                        record.remove(function () {
                            console.log(arguments);
                            callback();
                        });
                    });
                });

                async.parallel(tasks, onDone);
            });



        } else {
            var id = data;
            me.schema.findById(id, function (err, record) {
                record.remove(callback);
            });
        }
    };
}

module.exports = AbstractMongoRepository;