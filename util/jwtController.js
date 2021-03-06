const jwt = require('jsonwebtoken');

exports.sendJwt = (req, res, next) => {
  const {id, username} = res.locals;
  jwt.sign({id, username}, process.env.JWT_SECRET, (err, token) => {
    res.send({jwt: token});
  });
};

