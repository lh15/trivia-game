var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/users.js');
var Game = mongoose.model('Game');
var Question = mongoose.model('Question');
var games = require('../controllers/games.js');
module.exports = function (app) {
    app.post("/api/register", users.register);
    app.post("/api/login", users.login);
    app.get('/api/games', games.index);
    app.post("/api/games", games.saveGame);
    app.get('/api/questions', games.getQuestions);
    app.post("/api/questions", games.saveQuestion);
    // app.post("/api/questionsfirst", games.saveQuestionFirst);
}
