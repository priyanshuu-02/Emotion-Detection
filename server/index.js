require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const journalRoute = require('./routes/journal');

app.use(cors());
app.use(express.json());
app.use('/api/journal', journalRoute);

app.use(express.static('public'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
