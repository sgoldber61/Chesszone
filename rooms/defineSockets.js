const Lobby = require('./lobby.js');

// define socket behavior
module.exports = function(io, app) {
  // attach lobby onto app.locals
  app.locals.lobby = new Lobby();
  
  io.on('connection', function(socket) {
    // player sets up a pending room
    socket.on('start room', function(data) {
      // pending player's socketId, pending player's username
      app.locals.lobby.newPending(socket.id, data.username);
    });
    
    // player joins one of the pending rooms
    socket.on('join room', function(data) {
      // pending player's socketId, joining player's socketId, joining player's username
      app.locals.lobby.pendingToActive(data.pendingId, socket.id, data.joiningUsername);
      
      // broadcast to the pending player that the game is to start
      socket.broadcast.to(data.pendingId).emit('agree to game', {oppId: socket.id, username: data.joiningUsername});
    });
    
    // player sends a fen for a successful chess game move
    socket.on('send fen', function(data) {
      // receiving player's socketId, sending player's fen
      socket.broadcast.to(data.receivingId).emit('receive fen', {fen: data.fen});
    });
  });
};

