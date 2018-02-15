var validUrl = require('valid-url');
const Result = require('../models/result');

// all middleware go here
let middlewareObj = {};

middlewareObj.isValidUrl = function(req, res, next) {
  var url = req.url.toLowerCase().slice(5);

  if (validUrl.isUri(url)) {
    next();
  } else {
    res.json({ error: 'Not a valid url' });
  }
};

middlewareObj.isInDatabase = function(req, res, next) {
  var url = req.url.toLowerCase().slice(5);
  console.log(req.url);

  Result.findOne({ original_url: url }, function(err, foundResult) {
    if (err) {
      res.json({ error: 'Something went wrong' });
    } else {
      if (foundResult) {
        console.log(foundResult);
        res.json(
          {
            original_url: foundResult.original_url,
            short_url: foundResult.short_url
          }
        );
      } else {
        next();
      }
    }
  });
};

module.exports = middlewareObj;