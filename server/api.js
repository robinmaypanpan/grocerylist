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
    removeItem 
} = require('./database');

router.get('/getList', async (request, response) => {
    const { listId } = request.query;
    try {
        const result = await getList(listId);
        response.json(result);
    } catch (error) {
        response.json({success: false, error});
    }
}).post('/createList', async (request, response) => {
    const { name } = request.body;
    try {
        const listId = await createList(name);
        response.json({listId});
    } catch (error) {
        response.json({success: false, error});
    }
}).put('/updateList', async (request, response) => {
    const { listId, name } = request.body;
    try {
        const result = await updateList(listId, name);
        response.json(result);
    } catch (error) {
        response.json({success: false, error});
    }
}).delete('removeList', async (request, response) => {
    const { listId } = request.body;
    try {
        await removeList(listId);
        response.json({success: true});
    } catch (error) {
        response.json({success: false, error});
    }
})

router.post('/addItem', async (request, response) => {
    const { name, listId, categoryName } = request.body;
    if (!name || !listId) {
        console.error('Received invalid request to add item');
        response.json({error: 'Insufficient data to create item'});
        return;
    }

    try {
        const result = await addItem(name, listId, categoryName);
        response.json(result);
    } catch (error) {
        console.error('Failed to add item to database');
        response.json({success: false, error});
    }
}).put('/updateItem', async (request, response) => {
    const { itemId, name, listId, categoryName } = request.body;
    try {
        const result = await updateItem(itemId, name, listId, categoryName);
        response.json(result);
    } catch (error) {
        response.json({error});
    }
}).delete('/removeItem', async (request, response) => {
    const { itemId, listId } = request.body;
    try {
        const result = await removeItem(itemId, listId);
        response.json(result);
    } catch(error) {
        console.error('Failed to remove item from database');
        response.json({success: false, error});
    }
});

router.get('/getCategories', async (request, response) => {
    const { listId } = request.query;
    try {
        const result = await getCategories(listId);
        response.json(result);
    } catch (error) {
        response.json({success: false, error});
    }
}).put('/updateCategory', async (request, response) => {
    const { name, categoryId, listId } = request.body;
    try {
        const result = await updateCategory(name, categoryId, listId);
        response.json(result);
    } catch (error) {
        response.json({success: false, error});
    }
}).delete('removeCategory', async (request, response) => {
    const { categoryId, listId } = request.body;
    try {
        const result = await removeCategory(categoryId, listId);
        response.json(result);
    } catch (error) {
        response.json({success: false, error});
    }
})

module.exports = router;