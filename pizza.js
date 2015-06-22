(function(){
	'use strict';

	var express = require('express');

	var app = express();

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

	app.get('/', function(req, res){
		res.render('home',{
			pageTestScript:'/qa/tests-home.js'
		});
	});

	app.get('/login',function(req, res){
		res.render('login');
	});

	//handle 404 err
	app.use(function(req, res){
		res.status(404);
		res.render('404');
	});

	app.listen(app.get('port'), function(){
		console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
	});
})();