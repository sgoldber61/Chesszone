exports.findRooms = (app, req, res) => {
  const pendingUsers = app.locals.lobby.pendingUsers;
  const socketIds = Object.keys(pendingUsers);
  
  return socketIds.map(socketId => ({socketId, username: pendingUsers[socketId]}));
};

