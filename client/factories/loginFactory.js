myApp.factory("loginFactory", function ($http) {

    var factory = {};
    factory.currentUser = null;
    
    // index: Retrieve all 
    factory.getCurrentUser = function (callback) {
        callback(factory.currentUser);
        console.log(factory.currentUser);
    }
    factory.login = function (user, callback, errorHandler) {
        $http.post('/api/login', user).then(function (response) {
            console.log(response);
            if (!response.data.errors) {
                factory.currentUser = response.data.user;
                factory.getCurrentUser(callback);
            } else {
                errorHandler(response.data.errors);
            }
        });
    }

    return factory;
});