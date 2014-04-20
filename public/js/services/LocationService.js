angular.module('LocationService', []).factory('GeoLoc', ['$rootScope', '$q', '$window', function($rootScope, $q, $window){

  return {
    getLocation: function(){
      var deferred = $q.defer();
      $window.navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos)
        // $rootScope.$apply(function(){
          deferred.resolve(pos.coords);
        // });
      });
      return deferred.promise;
    }
  }
}])