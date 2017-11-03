var express = require('express');
var app = express();
var rootUrl = process.env.ROOT_URL || 'http://localhost:3000/';
var mongoose = require('mongoose');
var validUrl = require('valid-url');
var shortid = require('shortid');

mongoose.connect('mongodb://localhost/url_shortener');

//=============
// MODEL
//=============
var resultSchema = new mongoose.Schema({
	randomString: String,
	original_url: String,
	short_url: String
});

var Result = mongoose.model('Result', resultSchema);

//=============
// ROUTES
//=============
app.get('/', function(req, res) {
	res.send('URL Shortener');
});

app.get('/:string', function(req, res) {
	var string = req.params.string;

	Result.findOne({randomString: string}, function(err, foundResult) {
		if (err) {
			res.json({"error": "Something went wrong"});
		} else {
			if (foundResult) {
				console.log('redirect to original url');
				res.redirect(foundResult.original_url);
			} else {
				res.json({"error": 'Not a valid url'});
			}
		}
	});
});

app.get('/new/:url*', isValidUrl, isInDatabase,  function(req, res) {
	var url = req.url.toLowerCase().slice(5);
	var str = shortid.generate();

	Result.create({
		randomString: str,
		original_url: url,
		short_url: rootUrl + str
	}, function(err, result) {
			if (err) {
				res.json({"error": "Something went wrong"});
			} else {
				console.log(result);
				res.json(
					{
						"original_url": result.original_url,
						"short_url": result.short_url
					}
				);
			}
	});	
});


//=============
// MIDDLEWARE
//=============
function isShortUrl(req, res, next) {
	
}

function isValidUrl(req, res, next) {
	var url = req.url.toLowerCase().slice(5);

	if (validUrl.isUri(url)) {
		next();
	} else {
		res.json({"error": 'Not a valid url'});
	}	
}

function isInDatabase(req, res, next) {
	var url = req.url.toLowerCase().slice(5);

	Result.findOne({original_url: url}, function(err, foundResult) {
		if (err) {
			res.json({"error": "Something went wrong"});			
		} else {
			if (foundResult) {
				console.log(foundResult);
				res.json(
					{
						"original_url": foundResult.original_url,
						"short_url": foundResult.short_url
					}
				);
			} else {
				next();
			}			
		}
	}); 
}

app.listen(process.env.PORT || 3000, function() {
	console.log('App is running on port 3000');
});