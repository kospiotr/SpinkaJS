var express = require('express');
var scientistRepo = require('../../repository/scientistRepository.js');

var _ = require('underscore');
var router = express.Router();

router.get('/', function (req, res) {
    scientistRepo.findAll(function (err, records) {
        res.json(records);
    });
});

router.get('/:id', function (req, res) {
    var id = parseInt(req.param('id'));
    var results = scientistRepo.getById(id);
    res.json(results);
});


router.post('/', function (req, res) {
    var body = req.body;
    delete body._id;
    scientistRepo.insert(body, function(){
        res.end();
    });
});

router.put('/:id', function (req, res) {
    var body = req.body;
    var params = req.params;
    var id = params.id;
    scientistRepo.update(id, body, function(){
        res.end();
    });
});

router.delete('/:id', function (req, res) {
    var body = req.body;
    var params = req.params;
    var id = params.id;
    scientistRepo.remove(id, body, function(){
        console.log('deleted');
        res.end();
    });
});

module.exports = router; 