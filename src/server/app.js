var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index.js');

var App = function () {
  var me = this;

  /**
   *  Set up server IP address and port # using env variables/defaults.
   */
  me.setupVariables = function () {
    //  Set the environment variables we need.
    me.ipaddress = process.env.NODEJS_IP;
    me.port = process.env.NODEJS_PORT || 8080;

    if (typeof me.ipaddress === "undefined") {
      //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
      //  allows us to run/test the app locally.
      console.warn('No NODEJS_IP var, using 127.0.0.1');
      me.ipaddress = "127.0.0.1";
    }
    ;
  };

  /**
   *  terminator === the termination handler
   *  Terminate server on receipt of the specified signal.
   *  @param {string} sig  Signal to terminate on.
   */
  me.terminator = function (sig) {
    if (typeof sig === "string") {
      console.log('%s: Received %s - terminating sample app ...',
              Date(Date.now()), sig);
      process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()));
  };


  /**
   *  Setup termination handlers (for exit and a list of signals).
   */
  me.setupTerminationHandlers = function () {
    //  Process on exit and signals.
    process.on('exit', function () {
      me.terminator();
    });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
      'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function (element, index, array) {
      process.on(element, function () {
        me.terminator(element);
      });
    });
  };


  /*  ================================================================  */
  /*  App server functions (main app logic here).                       */
  /*  ================================================================  */

  /**
   *  Initialize the server (express) and create the routes and register
   *  the handlers.
   */
  me.initializeServer = function () {
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
    
    app.use('/', indexRouter);
    app.use(express.static(__dirname + '/../client'));
  };


  /**
   *  Initializes the sample application.
   */
  me.initialize = function () {
    me.setupVariables();
    me.setupTerminationHandlers();

    // Create the express server and routes.
    me.initializeServer();
  };


  /**
   *  Start the server (starts up the sample application).
   */
  me.start = function () {
    //  Start the app on the specific interface (and port).
    app.listen(me.port, me.ipaddress, function () {
      console.log('%s: Node server started on %s:%d ...', Date(Date.now()), me.ipaddress, me.port);
    });
  };

  me.initialize();
};

module.exports = App;