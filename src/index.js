const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const healthRouter = require('./routes/health');
const contactsRouter = require('./routes/contacts');

app.use('/health', healthRouter);
app.use('/api/contacts', contactsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MiniCRM backend listening on port ${port}`);
});

module.exports = app;
