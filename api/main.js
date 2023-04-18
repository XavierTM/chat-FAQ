
console.clear();

require('dotenv').config();
require('./env');

const express = require('express');
const { init: initDB } = require('./db');
const morgan = require('morgan');
const branches = require('./branches');


const app = express();

// middlewares
if (process.env.NODE_ENV !== 'test')
   app.use(morgan('dev'));

app.use(express.static(`${__dirname}/static`));
app.use(express.json());

// routes
app.use('/api/branches', branches);


app.get('*', (req, res) => {
   const indexFile = `${__dirname}/static/index.html`;
   res.sendFile(indexFile);
});


// initialization
const PORT = process.env.PORT;

initDB().then(() => {
   app.listen(PORT, async () => {
      console.log("Server started @ PORT", PORT);   
   });
});