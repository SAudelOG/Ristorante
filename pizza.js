(function(){
	'use strict';

	var express = require('express');

	var app = express();

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

	app.get('/', function(req, res){
		res.json({
			Status:'OK'
		});
	});

	app.listen(app.get('port'), function(){
		console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
	});
})();