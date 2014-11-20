var express = require('express');
var scientistRepo = require('../../repository/scientistRepository.js');
var multiparty = require('multiparty');

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
    var count = 0;
    var form = new multiparty.Form();
    console.log('uploading');

    form.on('error', function (err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('part', function (part) {
        console.log('on part');

        if (part.filename === null) {
            console.log('got field named ' + part.name);
            part.resume();
        }

        if (part.filename !== null) {
            count++;
            console.log('got file named ' + part.name);
            part.resume();
        }

        part.on('error', function (err) {
            console.log('on error');
        });
    });

    form.on('close', function () {
        console.log('Upload completed!');
//        res.setHeader('text/plain');
        res.end('Received ' + count + ' files');
    });

    form.parse(req);
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