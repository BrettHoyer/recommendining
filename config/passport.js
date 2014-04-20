var mongoose = require('mongoose'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../app/models/user'),
    configAuth = require('./auth');

module.exports = function(passport) {

  // Serialize the user id to push into the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // Deserialize the user object based on a pre-serialized token
  // which is the user id
  passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

  // Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {

          process.nextTick(function() {
            console.log("profile", profile)
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                
                if (user) {
                    console.log("USER: ", user);
                    return done(err, user)
                } else {

                    // if there is no user found with that facebook id, create them
                  var newUser            = new User();

                    // set all of the facebook information in our user model
                  newUser.facebook.id    = profile.id; // set the users facebook id                 
                  newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user                  
                  newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                  newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                  console.log("new User!", newUser)
                    // save our user to the database
                  newUser.save(function(err) {
                      if (err)
                          throw err;

                      // if successful, return the new user
                      return done(null, newUser);
                  });

                }
            });
          });
        }
    ));

}