myApp.controller('registerController', function ($scope, registerFactory, $location, $cookies) {
    console.log("reached controller");

    $scope.user = {};


    var errorHandler = function (errors) {
        $scope.validationErrors = errors;
        console.log(errors);
    }
    function setCurrentUser(currentUser) {
        $cookies.put('currentUser', JSON.stringify(currentUser));
        $location.path("/success");

    }
    $scope.getCurrentUser = function () {
        console.log("reached scope.index");
        loginFactory.getCurrentUser(setCurrentUser);
    }
    $scope.register = function () {
        $scope.submitted = true;
        if ($scope.registerForm.$valid) {
            console.log('Form submitted - fields passed validation');
            registerFactory.register($scope.user, setCurrentUser, errorHandler);
        } else {
            console.log("didnt pass ng validations ")
        }


    }
})