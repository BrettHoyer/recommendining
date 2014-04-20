angular.module('CategoryService', []).factory('Category', ['$q', '$resource', function($q, $resource){

  return {
    yelpCall: function(cat){

      var deferred = $q.defer();
      var Restaurants = $resource('/api/restaurants');

      Restaurants.get({category: cat}, function(results){

        deferred.resolve(results.businesses);
        
      })

      return deferred.promise;

    }

  }
}])