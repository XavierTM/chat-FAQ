
console.clear();

require('dotenv').config();
require('./env');

const express = require('express');
const { init: initDB } = require('./db');
const morgan = require('morgan');
const cors = require('cors');
const branches = require('./branches');
const media = require('./media');
const contacts = require('./contacts');


const app = express();

// middlewares
app.use(cors());

if (process.env.NODE_ENV !== 'test')
   app.use(morgan('dev'));

app.use(express.static(`${__dirname}/static`));
app.use(express.json({ limit: '100mb' }));

// routes
app.use('/api/branches', branches);
app.use('/api/media', media);
app.use('/api/contacts', contacts);


// initialization
const PORT = process.env.PORT;

initDB().then(() => {
   app.listen(PORT, async () => {
      console.log("Server started @ PORT", PORT);   
   });
});