const { ITEM_TABLE } = require('./constants');
const { getCategoryId } = require('./categories');
const { getList } = require('./list');
const getClient = require('./getClient');
const { executeQueries, connectAndQuery } = require('./query');

/**
 * Adds the provided item, with list id and category name, to the database
 */
async function addItem(name, listId, categoryName) {
    console.log(`List is ${listId}`);
    const client = await getClient();
    try {
        const categoryId = await getCategoryId(client, listId, categoryName);
        await executeQueries(client,
            {
                query: `INSERT INTO ${ITEM_TABLE} (name, timestamp, list_id, category_id) ` +
                `VALUES ($1::text, current_timestamp, $2, $3);`,
                values: [
                    name,
                    listId,
                    categoryId
                ]
            }
        ); 
    } finally {
        client.release();
    }
    return await getList(listId);
}

/**
 * Changes the name and category for a given item.
 */
async function updateItem(itemId, name, listId, categoryName) {
    const client = await getClient();
    try {
        const categoryId = await getCategoryId(client, listId, categoryName);
        await executeQueries(client,
            `UPDATE ${ITEM_TABLE} SET name=$1, category_id=$2 WHERE id=$3;`,
            [
                name,
                categoryId,
                itemId,
                listId
            ]
        ); 
    } finally {
        client.release();
    }
    return await getList(listId);
}

/**
 * removes a given item from the database
 */
async function removeItem(itemId, listId) {
    await connectAndQuery(
        { 
            query: `DELETE FROM ${ITEM_TABLE} WHERE id = $1 AND list_id = $2;`,
            values: [itemId, listId]
        }
    );

    return await getList(listId);
}

module.exports = {
    addItem,
    updateItem,
    removeItem
};