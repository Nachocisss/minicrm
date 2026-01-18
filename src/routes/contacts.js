const express = require('express');
const router = express.Router();

let contacts = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(contacts);
});

router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const contact = {
    id: nextId++,
    name,
    email: email || null,
    phone: phone || null,
    createdAt: new Date().toISOString(),
  };
  contacts.push(contact);
  res.status(201).json(contact);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const c = contacts.find((x) => x.id === id);
  if (!c) return res.status(404).json({ error: 'not found' });
  res.json(c);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = contacts.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  contacts[idx] = { ...contacts[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(contacts[idx]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = contacts.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = contacts.splice(idx, 1)[0];
  res.json(removed);
});

module.exports = router;
