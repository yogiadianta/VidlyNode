const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

app.get('/', (req, res) => {
  res.send('Movie Vidly Genre');
});

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
// app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
