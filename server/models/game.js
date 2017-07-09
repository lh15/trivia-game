// require mongoose
var mongoose = require('mongoose');
// // define Schema variable
var Schema = mongoose.Schema;
// define Message Schema
var GameSchema = new mongoose.Schema({
     _user: {
        type: String,
        ref: 'User',
        required: true
    },
    score: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

// register the schemas as models
// set our models by passing them their respective Schemas

mongoose.model('Game', GameSchema);
// store our models in variables

var Game = mongoose.model('Game');