const Lobby = require('./lobby.js');

// define socket behavior
module.exports = function(io, app) {
  // attach lobby onto app.locals
  app.locals.lobby = new Lobby();
  
  io.on('connection', function(socket) {
    // player sets up a pending room
    socket.on('start room', function(data) {
      // pending player's socketId, pending player's username
      lobby.newPending(socket.id, data.username);
    });
    
    // player joins one of the pending rooms
    socket.on('join room', function(data) {
      // pending player's socketId, joining player's socketId, joining player's username
      lobby.pendingToActive(data.pendingId, socket.id, data.joiningUsername);
    });
  });
};

