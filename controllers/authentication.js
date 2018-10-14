const User = require('../models/user');
const jwt = require('jwt-simple');

const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp
    },
    config.secret
  );
}

exports.signup = function(req, res, next) {
  // see if a user with given email exists
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide email and password '});
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if so, return error
    if (existingUser) {
      res.status(422).send({ error: 'Email is in use.' })
    }

    // if not, create and save user record
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  res.send( { token: tokenForUser(req.user)} );
};