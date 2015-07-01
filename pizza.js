(function(){
	'use strict';

	var express = require('express'),
			http = require('http');

	var app = express();

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

	app.use(express.static(__dirname + '/public'));

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

	app.get('/epic-fail', function(req, res){
		throw new Error('Nope!');
	});

	//Handle 404 err
	app.use(function(req, res){
		res.status(404);
		res.render('404');
	});

	//Handle 500 err
	app.use(function(err, req, res, next){
		console.error(err.stack);
		res.render('500')
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
