angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })

    .when('/auth/facebook', {
      templateUrl: 'views/fake.html',
      controller: 'MainController'
    })


  $locationProvider.html5Mode(true);

}]);
