(function(){
	'use strict';

	var express = require('express'),
			http = require('http');

	var app = express();

	var credentials = require('./credentials.js');

	//Set view engine Handelbars
	var handlebars = require('express-handlebars').create({
		defaultLayout: 'main',
		helpers:{
			section: function(name, options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	});
	app.engine('handlebars', handlebars.engine);
	app.set('view engine', 'handlebars');

	app.set('port', process.env.PORT || 3000);

	//use domains for better error handling
	app.use(function(req, res, next){
		//Create a domain for this request
		var domain = require('domain').create();
		//Handle errors on this domain
		domain.on('error',function(err){
			console.error('DOMAIN ERROR CAUGHT\n', err.stack);
			try{
				//failsafe shutdown in 5 seconds
				setTimeout(function(){
					console.error('Failsafe shutdown.');
					process.exit(1);
				},5000);

				//Disconnect form the cluster
				var worker = require('cluster').worker;
				if(worker) worker.disconnect();
				//Stop taking new request
				server.close();
				try{
					//Attempt to use Exprees error route
					next(err);
				} catch(error){
					//if Express error route failed, try
					//plain Node response
					console.error('Express error mechanism faild. \n', error.stack);
					res.statusCode = 500;
					res.setHeader('content-type', 'text/plain');
					res.end('Server error.');
				}
			} catch(error){
				console.error('Unable to send 500 response.\n', error.stack);
			}
		});
		//add the request and response objects to the domain
		domain.add(req);
		domain.add(res);
		// execute the rest of the request chain in the domain
		domain.run(next);
	});

	//logging
	switch(app.get('env')){
		case 'development':
			// compact, colorful dev logging
			app.use(require('morgan')('dev'));
			break;
		case 'production':
			// module 'express-logger' supports daily log rotation
			app.use(require('express-logger')({
				path: __dirname + '/log/requests.log'
			}));
			break;
	}

	app.use(express.static(__dirname + '/public'));

	// database configuration
	var mongoose = require('mongoose');
	var options = {
		server:{
			socketOptions:{keepAlive:1}
		}
	};
	switch(app.get('env')){
		case 'development':
			mongoose.connect(credentials.mongo.development.connectionString, options);
			break;
		case 'production':
			mongoose.connect(credentials.mongo.production.connectionString, options);
			break;
		default:
			throw new Error('Unknown execution enviroment: ' + app.get('env'));
	}

	var User = require('./models/user.js');

	User.find(function(err, users){
		if(users.length) return;

		new User({
			firstName:'Sergio Audel',
			lastName:'Ortiz',
			email:'audel91@gmail.com',
			isActive:false
		}).save();

		new User({
			firstName:'Fernando David',
			lastName:'Ortiz',
			email:'fdog@gmail.com',
			isActive:true
		}).save();

		new User({
			firstName:'Jorge Saul',
			lastName:'Ortiz',
			email:'bloke@gmail.com',
			isActive:true
		}).save();
	});

	//Middleware to Test app
	app.use(function(req, res, next){
		res.locals.showTests = app.get('env') != 'production' &&
					req.query.test === '1';
		next();
	});

	//Middleware to see evidence how workers
	//handle diferent request
	app.use(function(req, res, next){
		var cluster = require('cluster');
		if (cluster.isWorker) console.log('Worker %d recived request', cluster.worker.id);
		next();
	});

	app.get('/', function(req, res){
		res.render('home',{
			pageTestScript:'/qa/tests-home.js'
		});
	});

	app.get('/login',function(req, res){
		res.render('login');
	});

	app.get('/dashboard', function(req, res){
		res.render('dashboard/home');
	});

	app.get('/users', function(req, res){
		User.find({isActive:true},function(err, users){
			var context = {
				users : users.map(function(user){
					return {
						firstName:user.firstName,
						lastName:user.lastName,
						email:user.email
					};
				})
			};
			res.render('users',context);
			console.log(context);
		});
	});

	app.get('/fail', function(req, res){
		throw new Error('Nope!');
	});

	app.get('/epic-fail',function(req, res){
		process.nextTick(function(){
			throw new Error('Kaboom!');
		});
	});

	//Handle 404 err
	app.use(function(req, res){
		res.status(404);
		res.render('404');
	});

	//Handle 500 err
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.render('500');
	});

	function startServer(){
		http.createServer(app).listen(app.get('port'),function(){
			console.log('Express starded in ' + app.get('env') +
			' mode on http://localhost: ' + app.get('port') +
			'; press Ctrl-C to terminate.');
		});
	}

	if (require.main === module){
		// application run directly; start app server
		startServer();
	} else{
		// Application imported as a module via "require": export function
		// to create server
		module.exports = startServer;
	}

})();
