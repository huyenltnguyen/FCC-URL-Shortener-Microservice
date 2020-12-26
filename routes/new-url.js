var express = require('express');
var nanoid = require('nanoid');
var router = express.Router();
var Result = require('../models/result');
var middleware = require('../middleware');
var rootUrl	= process.env.ROOT_URL || 'http://localhost:3000/';

router.get('/new/:url*', middleware.isValidUrl, middleware.isInDatabase, function(req, res) {
  var url = req.url.toLowerCase().slice(5);

  Result.create({
    original_url: url,
    short_url: `${rootUrl}${nanoid()}`
  }, function(err, result) {
      if (err) {
        res.json({ error: 'Something went wrong' });
      } else {
        res.json(
          {
            original_url: result.original_url,
            short_url: result.short_url
          }
        );
      }
  });
});

module.exports = router;