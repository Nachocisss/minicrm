const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
const accountsRouter = require('./routes/accounts');
const dealsRouter = require('./routes/deals');
const { requireAuth } = require('./middleware/auth');

app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/api', requireAuth);
app.use('/api/contacts', contactsRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/deals', dealsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MiniCRM backend listening on port ${port}`);
});

module.exports = app;
