
const waitingPlayers = [];

exports.addPlayer = (socket) => {
  waitingPlayers.push(socket);
  if (waitingPlayers.length >= 2) {
    const [player1, player2] = waitingPlayers.splice(0, 2);
    startGame(player1, player2);
  }
};

exports.removePlayer = (socket) => {
  const index = waitingPlayers.indexOf(socket);
  if (index !== -1) waitingPlayers.splice(index, 1);
};

const startGame = (player1, player2) => {
  player1.emit('matchFound', { opponent: player2.user.username });
  player2.emit('matchFound', { opponent: player1.user.username });
  player1.game = { opponent: player2 };
  player2.game = { opponent: player1 };
};
