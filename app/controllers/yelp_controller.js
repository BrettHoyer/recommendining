  var dev = require('../../config/auth');
  console.log(dev.yelp)

  var yelp = require("yelp").createClient({
    consumer_key: dev.yelp.consumer_key, 
    consumer_secret: dev.yelp.consumer_secret,
    token: dev.yelp.token,
    token_secret: dev.yelp.token_secret
  });


  exports.all = function(req, res){

    console.log(req.query);
    //why was it return res.send() in the seed, makes no sense
    var params1 = {
                  term:            "food, " + req.query.category, 
                  limit:           20,
                  // ll:              req.query.lat + "," + req.query.lng,
                  location:        "San+Francisco",
                  // radius_filter:   40000
                  }

    var params2 = {
                  term:            "food, " + req.query.category, 
                  limit:           20,
                  offset:           20,
                  // ll:              req.query.lat + "," + req.query.lng,
                  location:        "San+Francisco"
                  // radius_filter:   40000
                  }

    yelp.search(params1, function(error, data1) {
      
      var restaurants = data1;

      yelp.search(params2, function(error, data2){

        restaurants.businesses = restaurants.businesses.concat(data2.businesses);
        res.send(restaurants);

      })

    });
  }

  // yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  //   console.log(error);
  //   console.log(data);
  // });