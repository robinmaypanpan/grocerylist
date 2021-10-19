const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, '..', 'build')))
  .use( express.json() ) // to support JSON-encoded bodies

  .get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html')))
  .use('/api', require('./api'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));