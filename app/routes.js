// app/routes.js
  var restaurants = require('./controllers/yelp_controller');
  var users = require('./controllers/user_controller');
  module.exports = function(app, passport) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.all('/*', function(req, res, next) {
      console.log("Brett hates himself right now")
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
      next();
     
    });
    // sample api route
    app.get('/api/restaurants', restaurants.all)

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/success',
        failureRedirect : '/error'
      }));

    // route for logging out
    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });

    app.get('/success', function(req, res){
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
      res.send("yayyyyy")
    })

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
        return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
    }


    // route to handle creating (app.post)
    // route to handle delete (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/views/index.html file
    });

  };

