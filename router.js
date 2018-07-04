const userController = require('./user/userController');
const jwtController = require('./util/jwtController');

// create server routes here
module.exports = function(app) {
  app.get('/api/hello', (req, res) => {
    res.send({message: 'Hi! Here is some content from the server.'});
  });
  
  app.get('/api/protected', userController.requireAuth, (req, res) => {
    res.send({
      message: `Hi, ${res.app.locals.username}! Here is some login-protected content.`,
    });
  });
  
  // authentication operations
  app.post('/auth/signin', userController.verifyUser, jwtController.sendJwt);
  app.post('/auth/signup', userController.signup, jwtController.sendJwt);
}

