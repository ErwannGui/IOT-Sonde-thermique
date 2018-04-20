'use strict';

var mongoose = require('mongoose'),
    Mesure = mongoose.model('Mesure');

exports.list_all_mesures = function(req, res) {
    Mesure.find({}, function(err, mesure) {
        if (err)
            res.send(err);
        res.json(mesure);
    });
};

exports.create_a_mesure = function(req, res) {
    var new_mesure = new Mesure(req.body);
    new_mesure.save(function(err, mesure) {
        if (err)
            res.send(err);
        res.json(mesure);
    });
};

exports.details = function(req, res) {
    Mesure.findById(req.params.mesureId, function(err, mesure) {
        if (err)
            res.send(err);
        res.json(mesure);
    });
};

exports.update_a_mesure = function(req, res) {
    Mesure.findOneAndUpdate({_id: req.params.mesureId}, req.body, {new: true}, function(err, mesure) {
        if (err)
            res.send(err);
        res.json(mesure);
    });
};

exports.delete_a_mesure = function(req, res) {


    Mesure.remove({
        _id: req.params.mesureId
    }, function(err, mesure) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};