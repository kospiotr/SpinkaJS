var express = require('express');
var scientistRepo = require('../../repository/scientistRepository.js');

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
        res.send('');
    });
});

module.exports = router; 