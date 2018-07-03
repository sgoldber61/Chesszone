const User = require('./userModel');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const {username, password} = req.body;
  
  if (!(username && password)) {
    return res.status(400).send({message: "You must provide username and password"});
  }
  
  // See if a user with the given username exists.
  User.findOne({username}, function(error, existingUser) {
    if (error) {
      return res.status(400).send({message: error.message});
    }
    
    // If a user with the username exists, return an error (can't sign up with an username already there).
    if (existingUser) {
      return res.status(400).send({message: "username is in use."});
    }
    
    // If a user with the username does not exist, create and save user record.
    const user = new User({
      username: username,
      password: password
    });
    
    user.save(function(error) { // save to database
      if (error) {
        return res.status(400).send({message: error.message});
      }
      
      next();
    });
    
  });
};


exports.verifyUser = (req, res, next) => {
  const {username, password} = req.body;
  
  if (!(username && password)) {
    return res.status(400).send({message: "You must provide username and password"});
  }
  
  // See if a user with the given username exists.
  let _user;
  
  User.findOne({username: req.body.username}).then((user) => {
    if (!user) {
      return Promise.reject(new Error('user not found'));
    }
    _user = user;
    return user.comparePassword(req.body.password);    
  }).then((isMatch) => {
    if (!isMatch) {
      return Promise.reject(new Error('password doeesn\'t match'));
    }
    // success
    res.app.locals.id = _user._id.toString();
    res.app.locals.username = _user.username;
    
    next();
  }).catch((error) => {
    res.status(400).send({message: error.message});
  });
};


exports.requireAuth = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(400).send({message: "Not logged in"});
  }
  
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (error, decoded) => {
    if (error) res.status(400).send({message: error.message});
    
    res.app.locals.id = decoded.id;
    res.app.locals.username = decoded.username;
    next();
  });
};

