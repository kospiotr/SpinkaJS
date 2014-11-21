var express = require('express');
var scientistRepo = require('../../repository/scientistRepository.js');
var fs = require("fs");
var multiparty = require('multiparty');
var csv = require("fast-csv");
var _ = require('underscore');
var router = express.Router();

router.get('/', function (req, res) {
    scientistRepo.findAll(function (err, records) {
        res.json({data: records});
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