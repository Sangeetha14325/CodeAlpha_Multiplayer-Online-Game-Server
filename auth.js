
const users = []; // For simplicity, using in-memory storage

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username: user.username }, 'secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    users.push({ username, password });
    res.json({ message: 'User registered successfully' });
  }
};
