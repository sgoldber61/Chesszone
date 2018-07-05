const express = require('express');
const path = require('path');

const userController = require('./user/userController');
const jwtController = require('./util/jwtController');
const roomsController = require('./rooms/roomsController');

// create server routes here
module.exports = function(app) {
  // primary operations
  app.get('/api/hello', (req, res) => {
    res.send({message: 'Hi! Here is some content from the server.'});
  });
  
  app.get('/api/protected', userController.requireAuth, (req, res) => {
    res.send({
      message: `Hi, ${res.app.locals.username}! Here is some login-protected content.`,
    });
  });
  
  app.get('/api/rooms', userController.requireAuth, roomsController.findRooms);
  
  // authentication operations
  app.get('/auth/fetchuser', userController.requireAuth, userController.fetchUser);
  app.post('/auth/signin', userController.verifyUser, jwtController.sendJwt);
  app.post('/auth/signup', userController.signup, jwtController.sendJwt);
  
  
  // debugging operations
  app.get('/api/tracklocals', (req, res) => {
    res.send(app.locals);
  });
  
  // serving images from server
  app.use('/img/chesspieces/wikipedia', express.static(path.join(__dirname, 'images')));
};



