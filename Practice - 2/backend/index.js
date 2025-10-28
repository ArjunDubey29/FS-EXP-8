const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(cors());
app.use(express.json());

// Hardcoded user (for demo). In real apps use DB + hashed passwords.
const demoUser = {
  id: 1,
  username: 'neha',
  password: 'password123' // plain-text for demo only
};

// Login route — returns JWT if credentials match
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  if (username === demoUser.username && password === demoUser.password) {
    const payload = { id: demoUser.id, username: demoUser.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to check token sent as Authorization: Bearer <token>
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; // attach payload
    next();
  });
}

// Protected route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}! This is protected data.`, user: req.user });
});

app.listen(PORT, () => {
  console.log(`JWT auth API running on http://localhost:${PORT}`);
});
