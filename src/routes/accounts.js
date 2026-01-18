const express = require('express');
const router = express.Router();

let accounts = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(accounts);
});

router.post('/', (req, res) => {
  const { name, website, industry, ownerId } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const account = {
    id: nextId++,
    name,
    website: website || null,
    industry: industry || null,
    ownerId: ownerId || null,
    createdAt: new Date().toISOString(),
  };
  accounts.push(account);
  res.status(201).json(account);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const a = accounts.find((x) => x.id === id);
  if (!a) return res.status(404).json({ error: 'not found' });
  res.json(a);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = accounts.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  accounts[idx] = { ...accounts[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(accounts[idx]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = accounts.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = accounts.splice(idx, 1)[0];
  res.json(removed);
});

module.exports = router;
