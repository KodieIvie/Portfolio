const express = require('express');
const glob = require('glob');
const passport = require('passport');
const keys = require('./keys');
const passportSetup = require('../app/components/passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const flash = require('connect-flash');


module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'pug');

  mongoose.Promise = global.Promise;
  
  const db = mongoose.connection;
  // mongo error
  db.on('error', console.error.bind(console, 'connection error:'));

  // use sessions for tracking logins
  app.use(session({
    secret: [keys.session.cookieKey],
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));
  
  // make user ID available in templates
  app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
  });

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(flash());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  
  // initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  const controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app;
};
