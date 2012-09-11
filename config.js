exports.configure = function(express, app) {
  var oneYearInMilliseconds = 31104000000;
  var sevenDaysInMilliseconds = 604800000;
  var twoDaysInMilliseconds = 172800000;
  var oneDayInMilliseconds = 86400000;
  var oneHourInMilliseconds = 3600000;

  app.set('IS_PRODUCTION', false);

  if(process.env.NODE_ENV == 'production'){
    app.set('IS_PRODUCTION', true);
  }

  app.configure(function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    var pub = __dirname + '/public';
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: oneYearInMilliseconds }));

    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(pub));
  });
}