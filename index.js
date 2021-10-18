const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');

console.log(process.env.DATABASE_URL);

const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: false
      });
  } else {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
            }
      });
  } })();

express()
  .use(express.static(path.join(__dirname, 'build')))
  .use( express.json() ) // to support JSON-encoded bodies

  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

  .get('/list', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM grocerylist_table');
      const results = result ? result.rows.map(({name}) => name) : [];
      res.json(results);
      res.send();
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))