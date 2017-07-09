myApp.factory("mainFactory", function ($http) {

  var factory = {};
  factory.games = [];
  factory.questions = [];
  factory.recentGame = {};





  // index: Retrieve all 
  factory.index = function (callback) {
    $http.get('/api/games').then(function (response) {
      console.log(response.data);
      factory.games = response.data.games
      callback(factory.games);
    });
  }
  factory.getQuestions = function (callback) {
    $http.get('/api/questions').then(function (response) {
      console.log(response.data);
      factory.questions = response.data.questions;
      callback(factory.questions);
    });
  }
  // factory.getQuestionsFirst = function (callback) {
  //   $http.post('/api/questionsfirst').then(function (response) {
  //     console.log(response.data);
  //     factory.questions = response.questions
  //     factory.index(callback);
  //   });
  // }
  // play 
  factory.play = function (game, callback) {
    factory.recentGame = game;
    $http.post('/api/games', game).then(function (response) {
      factory.games = response.games
      factory.index(callback);
    });
  }

  // new question 
  factory.createQuestion = function (question, callback) {
    $http.post('/api/questions', question).then(function (response) {
      factory.questions = response.questions
      factory.index(callback);
    });
  }



  return factory;
});