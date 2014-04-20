// server.js

  // modules =================================================
  var express = require('express');
  var app     = express();
  var mongoose= require('mongoose');
  var passport = require('passport');
  var fs = require('fs')

  // configuration ===========================================
  var models_path = __dirname + '/app/models'
  fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file)
  })
    
  // config files
  var db = require('./config/db');
  mongoose.connect(db.url);

  var port = process.env.PORT || 8080; // set our port

  require('./config/passport')(passport); // pass passport for configuration

  app.configure(function() {
    app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users
    app.use(express.logger('dev'));           // log every request to the console
    app.use(express.bodyParser());            // have the ability to pull information from html in POST
    app.use(express.methodOverride());          // have the ability to simulate DELETE and PUT
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
  });

  // routes ==================================================
  require('./app/routes')(app, passport); // configure our routes

  // start app ===============================================
  app.listen(port);                   // startup our app at http://localhost:8080
  console.log('Magic happens on port ' + port);       // shoutout to the user

  exports = module.exports = app;             // expose app

