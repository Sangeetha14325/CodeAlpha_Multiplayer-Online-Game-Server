
const stats = {}; // For simplicity, using in-memory storage

exports.updateStats = (username, result) => {
  if (!stats[username]) {
    stats[username] = { wins: 0, losses: 0 };
  }
  if (result === 'win') {
    stats[username].wins += 1;
  } else {
    stats[username].losses += 1;
  }
};

exports.getStats = (username) => {
  return stats[username] || { wins: 0, losses: 0 };
};
