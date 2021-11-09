/**
 * The api for our application.
 */

const express = require('express');
const router = express.Router();

const { 
    createList,
    updateList,
    removeList,
    getList, 

    getCategories,
    removeCategory,
    updateCategory,

    addItem,
    updateItem,
    removeItem,
    removeChecked 
} = require('./database');

router.get('/getList', async (request, response) => {
    const { listId } = request.query;
    const result = await getList(listId);
    response.json(result);
}).post('/createList', async (request, response) => {
    const { name } = request.body;
    const listId = await createList(name);
    response.json({listId});
}).put('/updateList', async (request, response) => {
    const { listId, name } = request.body;
    const result = await updateList(listId, name);
    response.json(result);
}).delete('removeList', async (request, response) => {
    const { listId } = request.body;
    await removeList(listId);
    response.json({success: true});
})

router.post('/addItem', async (request, response) => {
    const { name, listId, categoryName, sortOrder } = request.body;
    if (!name || !listId) {
        console.error('Received invalid request to add item');
        response.json({error: 'Insufficient data to create item'});
        return;
    }

    const result = await addItem(name, listId, categoryName, sortOrder);
    response.json(result);
}).put('/updateItem', async (request, response) => {
    const { id, itemId, name, listId, checked} = request.body;
    const result = await updateItem(id || itemId, name, listId, checked);
    response.json(result);
}).delete('/removeItem', async (request, response) => {
    const { id, itemId, listId } = request.body;
    const result = await removeItem(id || itemId, listId);
    response.json(result);
}).delete('/removeChecked', async (request, response) => {
    const { listId } = request.body;
    const result = await removeChecked(listId);
    response.json(result);
})

;

router.get('/getCategories', async (request, response) => {
    const { listId } = request.query;
    const result = await getCategories(listId);
    response.json(result);
}).put('/updateCategory', async (request, response) => {
    const { name, categoryId, sortOrder, listId } = request.body;
    const result = await updateCategory(name, categoryId, sortOrder, listId);
    response.json(result);
}).delete('removeCategory', async (request, response) => {
    const { categoryId, listId } = request.body;
    const result = await removeCategory(categoryId, listId);
    response.json(result);
})

module.exports = router;