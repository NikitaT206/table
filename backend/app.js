const express = require('express')
const {client} = require('./db')

const PORT = process.env.PORT || 8080

const app = express()

app.listen(PORT, () => console.log('App listen on port ' + PORT))

client.connect()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  return next();
});

// const query = 'DROP TABLE testtable'

// const query = 'CREATE TABLE testtable (id SERIAL PRIMARY KEY, date DATE DEFAULT CURRENT_DATE, name VARCHAR(255), amount INTEGER, distance INTEGER)'
const query = `INSERT INTO testtable (name, amount, distance) VALUES ('blueberry', 300, 1500)`

client.query(query).then(() => {
  console.log('Table insert successfully!');
  // client.end(console.log('Closed client connection'));
})
.catch(err => console.log(err))

app.get('/', (req, res, next) => {
  // res.send('fqwf')
  const query = 'SELECT * FROM testtable;'
  client.query(query).then((row) => {
    const rows = row.rows
    res.send(rows)
  }).catch(next)
})

