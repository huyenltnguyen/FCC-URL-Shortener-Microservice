var express 	= require('express');
var app 			= express();
var rootUrl 	= process.env.ROOT_URL || 'http://localhost:3000';
var mongoose 	= require('mongoose');

// Requiring routes
var indexRoute 		= require('./routes/index.js');
var newUrlRoute 	= require('./routes/new-url');
var shortUrlRoute = require('./routes/short-url');

app.use(express.static('public'));
mongoose.connect('mongodb://localhost/url_shortener');

app.use(indexRoute);
app.use(newUrlRoute);
app.use(shortUrlRoute);

app.listen(process.env.PORT || 3000, function() {
	console.log('App is running on port 3000');
});