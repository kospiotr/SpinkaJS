var express = require('express');
var scientistRepo = require('../../repository/scientistRepository.js');
var fs = require("fs");
var async = require('async');
var csv = require("fast-csv");
var _ = require('underscore');
var router = express.Router();

var rewrite = function (query, params) {
    var out = {};
    _.each(params, function (param) {
        var source = param.source;
        var defaultValue = param.defaultValue;
        var value = query[source];
        value = !value && defaultValue ? defaultValue : value;
        if (value) {
            var target = param.target ? param.target : source;
            var transformer = param.transformer;
            out[target] = transformer ? transformer(value) : value;
        }
    });
    return out;
};

var prepareCondtions = function (query) {
    var out = {};
    return out;
};

var prepareFields = function (query) {
    var out = {};
    return out;
};

var prepareOptions = function (query) {
    return rewrite(query, [
        {source: 'limit'},
        {source: 'start', target: 'skip'},
        {source: 'showTotal', defaultValue: 'true', transformer: function (value) {
                return value === 'true';
            }}
    ]);
};

var importFile = function (path, callback) {
    var stream = fs.createReadStream(path);
    var headers = [];
    var out = [];
    var currentLine = -1;
    var onRowRead = function (data) {
        currentLine++;
        if (currentLine === 0) {
            headers = data;
        } else {
            var current = {};
            _.each(data, function (element, index, list) {
                current[headers[index]] = element;
            });
            out.push(current);
        }
    };
    var onEnd = function (data) {
        scientistRepo.insert(out, function (err, record) {
            callback(record.length);
        });
    };
    csv.fromStream(stream).on("data", onRowRead).on("end", onEnd);
};

router.get('/', function (req, res) {
    var conditions = prepareCondtions(req.query);
    var fields = prepareFields(req.query);
    var options = prepareOptions(req.query);

    console.log('Query: %j', {conditions: conditions, fields: fields, options: options});

    scientistRepo.findAll(conditions, fields, options, function (err, records) {
        res.json(records);
    });
});

router.get('/:id', function (req, res) {
    var id = req.param('id');
    scientistRepo.getById(id, function (err, record) {
        res.json({data: record});
    });
});


router.post('/batch', function (req, res) {
    var body = req.body;
    var createItems = body.create;
    var readItems = body.read;
    var updateItems = body.update;
    var deleteItems = body.delete;
    console.log('batching: %j', req.body);
    var readRequestStatus = {};
    var updateRequestStatus = {};
    var deleteRequestStatus = {};
    var out = {
        success: true,
        readStatus: readRequestStatus,
        updateStatus: updateRequestStatus,
    };
    var tasks = [
        function (callback) {
            scientistRepo.insert(createItems, function (err, records) {
                out.createStatus = {
                    data: records,
                    msg: 'Added ' + (records == null ? 0 : records.length) + ' records',
                    success: true
                };
                callback();
            });
        },
        function (callback) {
            scientistRepo.update(updateItems, function (err, records) {
                out.updateStatus = {
                    data: records,
                    msg: 'Updated ' + (records == null ? 0 : records.length) + ' records',
                    success: true
                };
                callback();
            });
        },
        function (callback) {
            scientistRepo.remove(deleteItems, function (err) {
                out.deleteStatus = {
                    success: true
                };
                callback();
            });
        },
    ];

    var onDone = function () {
        res.json(out);
    };
    async.parallel(tasks, onDone);
});

router.post('/', function (req, res) {
    console.log('inserting');
    var body = req.body;
    scientistRepo.insert(body, function (err, record) {
        res.json({
            data: record,
            msg: 'Added record',
            success: true
        });
    });
});

router.post('/import', function (req, res) {
    var path = req.files.file.path;
    var totalImportedFiles = 0;
    var tasks = [function (callback) {
            importFile(path, function (filesImportedCount) {
                totalImportedFiles += filesImportedCount;
                callback();
            });
        }];

    var onDone = function () {
        res.json({success: true, msg: 'Imported ' + totalImportedFiles + ' files'});
    };
    async.parallel(tasks, onDone);

});

router.put('/:id', function (req, res) {
    var record = req.body;
    var params = req.params;
    record._id = params.id;
    scientistRepo.update(record, function (err, record) {
        res.json({data: record});
    });
});

router.delete('/:id', function (req, res) {
    var body = req.body;
    var params = req.params;
    var id = params.id;
    scientistRepo.remove(id, function (err) {
        res.end();
    });
});

module.exports = router; 