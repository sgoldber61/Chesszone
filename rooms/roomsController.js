exports.findRooms = (req, res) => {
  const pendingUsers = res.app.locals.lobby.pendingUsers;
  const socketIds = Object.keys(pendingUsers);
  
  res.send(socketIds.map(socketId => ({socketId, username: pendingUsers[socketId]})));
};

