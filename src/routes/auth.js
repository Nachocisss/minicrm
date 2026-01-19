const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Demo-only users in memory.
const users = [
  { id: 1, email: 'admin@minicrm.test', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@minicrm.test', password: 'user123', role: 'user' },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.json({ token, tokenType: 'Bearer', expiresIn: JWT_EXPIRES_IN });
});

module.exports = router;
