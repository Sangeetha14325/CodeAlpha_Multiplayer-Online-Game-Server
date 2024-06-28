
let socket;

const login = () => {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      connectSocket();
    } else {
      alert('Login failed');
    }
  });
};

const register = () => {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  });
};

const connectSocket = () => {
  socket = io({ auth: { token: localStorage.getItem('token') } });

  socket.on('connect', () => {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('game').style.display = 'block';
  });

  socket.on('matchFound', (data) => {
    document.getElementById('opponent').innerText = 'Opponent: ' + data.opponent;
  });

  socket.on('opponentAction', (action) => {
    document.getElementById('status').innerText = 'Opponent made a move';
  });
};

const sendAction = (action) => {
  socket.emit('gameAction', action);
  document.getElementById('status').innerText = 'You made a move';
};
