
exports.handleAction = (socket, action) => {
  const opponentSocket = socket.game.opponent;
  if (opponentSocket) {
    opponentSocket.emit('opponentAction', action);
  }
};
