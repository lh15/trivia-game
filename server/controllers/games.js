var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
module.exports = {
  index: function (req, res) {
    Game.find({}).populate('_user').exec(function (err, games) {
      if (err) {
        console.log(err);
        res.json({ errors: err });
      } else {
        console.log("success");
        res.json({ games: games });
      }
    });
  },
  saveGame: function (req, res) {
    var newGame = new Game({ _user: req.body.user, score: req.body.score });
    newGame.save(function (err) {
      if (err) {
        console.log(err);
        res.json({ errors: err });
      } else {
        console.log("success");
        res.json({ message: "saved game to database" });
      }
    })
  },
  getQuestions: function (req, res) {
    Question.find({}, function (err, questions) {
      if (err) {
        console.log(err);
        res.json({ errors: err });
      } else {
        console.log("success");
        res.json({ questions: questions });
      }
    });
  },
  saveQuestion: function (req, res) {
    var newQuestion = new Question(req.body);
    newQuestion.save(function (err) {
      if (err) {
        console.log(err);
        res.json({ errors: err });
      } else {
        console.log("success");
        res.json({ message: "saved question to database" });
      }
    })
  // },
  // saveQuestionFirst: function (req, res) {
  //   var arr = [{
  //     question: "how old is leibel?",
  //     answer: "25",
  //     fakeAnswer1: "22",
  //     fakeAnswer2: "26"
  //   }, {
  //     question: "where did leibel learn to code?",
  //     answer: "coding dojo",
  //     fakeAnswer1: "genral assembly",
  //     fakeAnswer2: "flatiron school"
  //   }, {
  //     question: "how many states are there in the us?",
  //     answer: "50",
  //     fakeAnswer1: "51",
  //     fakeAnswer2: "52"
  //   }, {
  //     question: "how bad is chicago's weather?",
  //     answer: "really bad",
  //     fakeAnswer1: "ok",
  //     fakeAnswer2: "great"
  //   }, {
  //     question: "how do you spell the state containing chicago",
  //     answer: "Illinois",
  //     fakeAnswer1: "Illinoy",
  //     fakeAnswer2: "Illinoi"
  //   }]
  //   for (var i = 0; i < arr.length; i++) {
  //     var newQuestion = new Question(arr[i]);
  //     newQuestion.save(function (err) {
  //       if (err) {
  //         console.log(err);
  //         res.json({ errors: err });
  //       } else {
  //         console.log("success");
  //         res.json({ message: "saved question to database" });
  //       }
  //     })
  //   }
  },


}