var express = require('express');
var scientistRepo = require('../../repository/scientistRepository.js');
var fs = require("fs");
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
        {source: 'showTotal', defaultValue: 'true', transformer: function(value){return value === 'true';}}
    ]);
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


router.post('/', function (req, res) {
    var body = req.body;
    delete body._id;
    scientistRepo.insert(body, function (err, record) {
        res.json({data: record});
    });
});

router.post('/import', function (req, res) {
    console.log(req.body)
    console.log(req.files);
    if (req.files.length !== 1) {
        res.json({success: true, msg: 'Imported 0 records.'});
    }
    var path = req.files.file.path;
    var stream = fs.createReadStream(path);
    var headers = [];
    var out = [];
    var currentLine = -1;
    var onData = function (data) {
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
            res.json({success: true, msg: 'Imported ' + record.length + ' records.'});
        });
    };
    csv.fromStream(stream).on("data", onData).on("end", onEnd);

});

router.put('/:id', function (req, res) {
    var body = req.body;
    var params = req.params;
    var id = params.id;
    scientistRepo.update(id, body, function (err, record) {
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