const jwt = require('jsonwebtoken');

exports.setCookie = (req, res, next) => {
  const {id, username} = res.app.locals;
  jwt.sign({id, username}, process.env.JWT_SECRET, (err, token) => {
    res.cookie('jwt', token, {httpOnly: true});
    res.json({token});
  });
};

exports.removeCookie = (req, res, next) => {
  res.cookie('jwt', '', {expires: new Date()});
  res.json({message: 'logged out'});
};

