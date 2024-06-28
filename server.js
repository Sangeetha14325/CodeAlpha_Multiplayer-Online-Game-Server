
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const matchmaking = require('./matchmaking');
const game = require('./game');
const playerStats = require('./playerStats');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

app.post('/login', auth.login);
app.post('/register', auth.register);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return next(new Error('Authentication error'));
    socket.user = user;
    next();
  });
});

io.on('connection', (socket) => {
  console.log('New client connected');
  matchmaking.addPlayer(socket);

  socket.on('gameAction', (action) => {
    game.handleAction(socket, action);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    matchmaking.removePlayer(socket);
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));
