/**
 * The api for our application.
 */

const express = require('express');
const router = express.Router();
const { getItems, addItem, removeItem } = require('./database');

router.get('/list', async (request, response) => {
    try {
        const items = await getItems();
        // const results = [...Array(200)].map((val, i) => `Test Item ${i}`);
        response.json(items);
    } catch (error) {
        response.send(`Error: ${error}`);
    }
});

router.post('/addItem', async (request, response) => {
    const { name } = request.body;
    if (!name) {
        console.error('Received invalid request to add item');
        response.send('Error: No item provided');
        return;
    }

    try {
        const result = await addItem(name);
        response.json(result);
    } catch (error) {
        console.error('Failed to add item to database');
        response.send(`Error: ${error}`);
    }
});

router.post('/removeItem', async (request, response) => {
    console.log(`Got removal request for ${JSON.stringify(request.body)}`);
    const { id, name } = request.body;
    try {
        const result = await removeItem(id, name);
        response.json(result);
    } catch(error) {
        console.error('Failed to remove item from database');
        response.send(`Error: ${error}`);
    }
});

module.exports = router;