/**
 * The api for our application.
 */

const express = require('express');
const router = express.Router();
const { connectAndQuery } = require('./database');

router.get('/list', async (req, res) => {
    try {
        const result = await connectAndQuery('SELECT * FROM grocerylist_table');
        const results = result ? result.rows.map(({name}) => name) : [];
        res.json(results);
    } catch (err) {
        res.send("Error " + err);
    }
});

module.exports = router;