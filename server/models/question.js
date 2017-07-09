// require mongoose
var mongoose = require('mongoose');
// // define Schema variable
var Schema = mongoose.Schema;
// define Question Schema
var QuestionSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true 
    },
    answer: { 
        type: String, 
        required: true 
    },
    fakeAnswer1: { 
        type: String, 
        required: true 
    },
    fakeAnswer2: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

// register the schemas as models
// set our models by passing them their respective Schemas
mongoose.model('Question', QuestionSchema);
// store our models in variables
var Question = mongoose.model('Question');
