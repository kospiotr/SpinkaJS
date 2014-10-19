var inherits = require('inherits');
var mongoose = require('mongoose');

var abstractRepo = require('./abstractMongoRepository');
var mongoAccess = require('./mongoAccess.js');

var Repo = function () {
    this.schema = mongoAccess.connection.model('scientist', new mongoose.Schema({
        name: String,
        surname: String,
        degree: String,
        department: String,
        unit: String,
        specialization: String,
        phone: String,
        email: String,
        website: String,
        image: String,
        experience: String,
        researches: String,
        expertise: String
    }));
    abstractRepo.call(this);
}

inherits(Repo, abstractRepo);

module.exports = new Repo();