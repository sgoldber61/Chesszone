const userController = require('./user/userController');
const cookieController = require('./util/cookieController');

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
  app.post('/auth/signin', userController.verifyUser, cookieController.setCookie);
  app.post('/auth/signup', userController.signup, cookieController.setCookie);
  app.post('/auth/signout', cookieController.removeCookie);
}

