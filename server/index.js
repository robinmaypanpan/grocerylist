const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

const { initializeAndMigrateDatabase } = require('./database');

async function initalize() {
  try {
    console.log('Starting up Database Connection');
    const {success: initialized, error} = await initializeAndMigrateDatabase();
    if(!initialized) {
      throw error || new Error('Database connection failed for unknown reason');
    }
  } catch (error) {
    console.error(`Failed to start server due to database error ${error}`);
    return;
  }

  console.log('Starting ExpressJS server');

  express()
    .use(express.static(path.join(__dirname, '..', 'build')))
    .use( express.json() ) // to support JSON-encoded bodies
    .use(bodyParser.urlencoded({ extended: false }))
  
    .use('/api', require('./api'))
  
    // Any remainining requests are passed directly to the client so that it can do client-side routing.
    .get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')))
  
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
}

initalize();