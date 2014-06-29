var express = require("express");
var app = express();
var MemoryStore = require('connect').session.MemoryStore;
var dbPath      = 'mongodb://localhost/QApp';

// Import the data layer
var mongoose = require('mongoose');

// Import the tech table
var models = {
	TechnologysList : require('./models/TechnologysList')(mongoose)
};

app.configure(function() {
	app.set('view engine', 'jade');
	app.use(express.static(__dirname + '/public'));
	app.use(express.limit('1mb'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: "QApp", store: new MemoryStore()}));
	mongoose.connect(dbPath, function onMongooseError(err) {
		if (err) throw err;
	});
});

/*
 * location:QASystem/views/index.jade
 * requirement: require.js
 * loads: QASystem/public/js/boot.js
 */
app.get('/', function(req, res) {
	res.render('index.jade');
});

app.get('/index',function(req,res) {
	models.TechnologysList.populateTech(function(docs) {
		res.send(docs);
	});
});

app.get('/reviewquestions',function(req,res) {
	models.TechnologysList.question(function(docs) {
		res.send(docs);
	});
});

app.post('/questionSubmit',function(req,res) {
	models.TechnologysList.questionInsert(
		req.param('question',''),
		req.param('answer',''),
		req.param('difficultylevel'),
		req.param('conceptscore'),
		req.param('importancescore'),
		function(success) { 
			if(success == true) {
				res.send(200);
				console.log('app.js::post::/questionSubmit:: success'); 
			} else {
				console.log("app.js::post::/questionSubmit:: failure");
			}
		}
	);
});

app.listen(8080);
console.log("app.js::listening to port 8080.");