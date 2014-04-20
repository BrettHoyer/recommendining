angular.module('MainCtrl', []).controller('MainController', ['GeoLoc', 'Category', 'localStorageService', 'Facebook', '$rootScope', '$resource', '$http', '$scope', function(GeoLoc, Category, localStorageService, Facebook, $rootScope, $resource, $http, $scope){

  var yelpCall = function(cat){

    var Restaurants = $resource('/api/restaurants');

    Restaurants.get({category: cat}, function(results){

      $scope.restaurants = results.businesses;

    })

  }

  // GeoLoc.getLocation().then(function(data){
  //   $scope.lat = data.latitude;
  //   $scope.lng = data.longitude;
  //   console.log("getLocation", data)

  //   yelpCall(data.latitude, data.longitude, "italian")

    
  // });

  $scope.categories = ["italian", "mexican", "pizza", "chinese", "indian", "ethnic", "cheesesteak", "chicken", 'burrito'];

  $scope.newCat = function(){

    var localCat = localStorageService.get($scope.category);

    if(localCat){

      $scope.restaurants = localCat;

    } else {

      $scope.restaurants = [];

      Category.yelpCall($scope.category).then(function(res){

        localStorageService.add($scope.category, res);
        $scope.restaurants = localStorageService.get($scope.category);
   
      })  

    }

  }

  $scope.facebookAuth = function(){

    $http({method: 'GET', url: '/auth/facebook'})
    .success(function(){
      console.log('fucking finally!')
    })
    .error(function(){
      console.log('error brah')
    })  
  }

  // // Here, usually you should watch for when Facebook is ready and loaded
  //  $scope.$watch(function() {

  //    return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.

  //  }, function(newVal) {

  //    $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
  //    $scope.getLoginStatus()

  //  });

  // // From now on you can use the Facebook service just as Facebook api says
  // // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
  // $scope.login = function() {

  //   console.log('login');
  //   Facebook.login(function(response) {
  //     // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
  //     if(response.status === 'connected'){

  //       console.log(response)
  //       $rootScope.loggedIn = true;
  //       $scope.me();
  //       $scope.$apply()

  //     }

  //   });
  // };

  // $scope.logout = function() {

  //   console.log('logout');
  //   Facebook.logout(function(response) {

  //     // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
  //     console.log(response)
  //     $rootScope.loggedIn = false;
  //     $scope.user = null;
  //     $scope.$apply()

  //   });
  // };


  // $scope.getLoginStatus = function() {

  //   Facebook.getLoginStatus(function(response) {

  //     if(response.status == 'connected') {

  //       $scope.$apply(function() {
  //         $rootScope.loggedIn = true;
  //         $scope.me();
  //       });

  //     } else {

  //       $scope.$apply(function() {
  //         $rootScope.loggedIn = false;
  //       });

  //     }
  //   })
  // }

  //   $scope.me = function() {

  //     Facebook.api('/me?fields=id, name, picture', function(response) {
  //       $scope.$apply(function() {
  //         // Here you could re-check for user status (just in case)
  //         console.log(response)
  //         $scope.user = response;
  //       });
  //     });

  //   };
  

}])