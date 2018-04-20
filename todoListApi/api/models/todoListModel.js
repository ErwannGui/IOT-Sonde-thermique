
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Mesure = new Schema({
    location: {
        type: String,
        required: 'Lieu de la mesure'
    },
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        type: String
    }
});

module.exports = mongoose.model('Mesure', Mesure);