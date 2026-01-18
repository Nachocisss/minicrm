const express = require('express');
const router = express.Router();

let deals = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(deals);
});

router.post('/', (req, res) => {
  const { title, description, value, stage, accountId, contactId, ownerId } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const deal = {
    id: nextId++,
    title,
    description: description || null,
    value: value || 0,
    stage: stage || 'new',
    accountId: accountId || null,
    contactId: contactId || null,
    ownerId: ownerId || null,
    version: 1,
    createdAt: new Date().toISOString(),
  };
  deals.push(deal);
  res.status(201).json(deal);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const d = deals.find((x) => x.id === id);
  if (!d) return res.status(404).json({ error: 'not found' });
  res.json(d);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = deals.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const updated = { ...deals[idx], ...req.body, updatedAt: new Date().toISOString() };
  updated.version = (deals[idx].version || 1) + 1;
  deals[idx] = updated;
  res.json(deals[idx]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = deals.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = deals.splice(idx, 1)[0];
  res.json(removed);
});

module.exports = router;
