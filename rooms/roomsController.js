exports.findRooms = (req, res) => {
  const pendingUsers = res.app.locals.lobby.pendingUsers;
  res.send({pendingUsers});
};

