// array with: socketId, username

class Lobby {
  constructor() {
    this.pendingUsers = {};
    this.activeUsers = {};
  }
  
  // pending player's socketId, pending player's username
  newPending(socketId, username) {
    this.pendingUsers[socketId] = username;
  }
  
  // pending player's socketId, joining player's socketId, joining player's username
  pendingToActive(pendingId, joiningId, joiningUsername) {
    // extract pending player's username
    const pendingUsername = this.pendingUsers[pendingId];
    delete this.pendingUsers[pendingId];
    
    // make pending player active
    this.activeUsers[pendingId] = {opp: {id: joiningId, username: joiningUsername}};
    // make joining player active
    this.activeUsers[joiningId] = {opp: {id: pendingId, username: pendingUsername}};
  }
};

module.exports = Lobby;
