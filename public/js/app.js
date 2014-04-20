var app = angular.module('food', ['food.externals', 'food.controllers', 'food.services']);

app.config(['FacebookProvider', function(FacebookProvider){

  FacebookProvider.init('622676791140729')
  
}])

app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
}]);

angular.module('food.externals', ['ngRoute', 'appRoutes', 'LocalStorageModule', 'ngResource', 'facebook'])
angular.module('food.controllers', ['MainCtrl'])
angular.module('food.services', ['LocationService', 'CategoryService'])