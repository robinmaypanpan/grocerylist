const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, '..', 'build')))
  .use( express.json() ) // to support JSON-encoded bodies

  .use('/api', require('./api'))

  // Any remainining requests are passed directly to the client so that it can do client-side routing.
  .get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));