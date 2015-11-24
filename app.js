
/**
 * Module dependencies.
 * Following modules have been excluded from express after 4.x releases:
 * app.use(express.favicon())
 * app.use(express.logger('dev'))
 * app.use(express.bodyParser())
 * app.use(express.methodOverride())
 * 
 * app.use(app.router) --> has been deprecated in 4.x
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , logger = require("./utils/logger") //custom logger to log to a file
  , bodyparser = require('body-parser')
  , config = require('./config');


var app = express();

// all environments
app.set('port', process.env.PORT || config.server.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//parse application/x-www-form-urlencoded
//app.use(bodyparser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyparser.json());

//get an instance of the express Router
var router = express.Router();

//middleware to use for all requests
//all routing happens in the order in which they are mentioned here 
router.use(function(req, res, next) {
	//all common validations/authorization etc can be done in this method
	//It is like a filter
    // do logging
    logger.info('Something is happening.');
 // make sure we go to the next routes and don't stop here. similar to request chaining in filters
    next();
});

//test route to make sure everything is working
router.get('/', function(req, res) {
 res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users').get(user.getAllUsers);
//to be called using http://localhost:3999/api/users/iqbaldeep@gmail.com/Newuser
router.route('/users/:username/:password').post(user.loginUserGet);
//to be called using 
router.route('/users').post(user.loginUserPost);
router.route('/users');


//all of our routes will be prefixed with /api
app.use('/api', router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
