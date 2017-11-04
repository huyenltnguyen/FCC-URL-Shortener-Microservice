var express	= require('express');
var router 	= express.Router();
var Result 	= require('../models/result');
var rootUrl = process.env.ROOT_URL || 'http://localhost:3000/';

router.get('/:string', function(req, res) {
	var url = rootUrl + req.params.string;	

	Result.findOne({short_url: url}, function(err, foundResult) {
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

module.exports = router;