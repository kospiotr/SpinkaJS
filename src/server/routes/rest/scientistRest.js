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

var post = function(req, res){
  var body = req.body;
  var params = req.params;
  var id = params.id;
  
  var toSave = {
    name: body.name,
    surname: body.surname
  };
  scientistRepo.save(id, toSave);
  res.end();
};

router.put('/', post);
router.put('/:id', post);

module.exports = router; 