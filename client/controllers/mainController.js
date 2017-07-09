myApp.controller('mainController', ['$scope', 'mainFactory', '$location', '$cookies', function ($scope, mainFactory, $location, $cookies) {
  console.log("reached controller");
  $scope.newQuestion = {};
  $scope.game = {};
  $scope.search = {};
  $scope.games = [];
  $scope.questions = [];
  $scope.score = {};
  $scope.currentUser = {};
  $scope.question1 = null;
  $scope.question2 = null;
  $scope.question3 = null;
  $scope.recentGame = mainFactory.recentGame;



  //shuffle questions
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //------------------
  //check for current user
  //------------------
  var currentUser = $cookies.get('currentUser');
  if (!currentUser) {

    $location.path("/login");
  } else {
    $scope.currentUser = JSON.parse(currentUser);

  }




  function setQuestions(data) {
    $scope.questions = shuffle(data);
    console.log("questions in play:", $scope.questions);
    $scope.newQuestion = {};
  }
  function setGames(data) {
    $scope.games = data;
    $scope.game = {};
  }

  $scope.index = function () {
    console.log("reached scope.index");
    mainFactory.index(setGames);
  }
  $scope.getQuestions = function () {
    console.log("reached scope.getQuestions");
    mainFactory.getQuestions(setQuestions);
  }

  $scope.index();
  $scope.getQuestions();


  $scope.letsPlay = function () {
    console.log("lets play");

  }
  $scope.play = function () {
    var score = 0;
    if ($scope.question1 === $scope.questions[0].answer) {
      score += 1;
    } if ($scope.question2 === $scope.questions[1].answer) {
      score += 1;
    } if ($scope.question3 === $scope.questions[2].answer) {
      score += 1;
    }
    $scope.game = { user: $scope.currentUser._id, score: score };
    mainFactory.play($scope.game, setGames);
    $location.path("/dashboard");
  }


  $scope.createQuestion = function () {
    mainFactory.createQuestion($scope.newQuestion, setQuestions);
    $location.path("/dashboard");
  }

  $scope.logOut = function () {
    $cookies.remove('currentUser');
    $scope.currentUser = null;
    $location.path("/login");
  }
}])