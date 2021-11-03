const { LIST_TABLE, CATEGORY_NONE, CATEGORY_TABLE, ITEM_TABLE } = require('./constants');
const { connectAndQuery, executeQueries } = require('./query');
const getClient = require('./getClient');

/**
 * Creates a new list and returns its id
 */
async function createList(name) {
    const client = await getClient();
    const [result] = await executeQueries(client, [
        {
            query: `INSERT INTO ${LIST_TABLE} VALUES(uuid_generate_v4(), $1) RETURNING *;`,
            values: [name]
        }
    ]);
    const listId = result.rows[0].id;

    await executeQueries(client, {
        query: `INSERT INTO ${CATEGORY_TABLE} (name, list_id) VALUES ($1, $2);`,
        values: [CATEGORY_NONE, listId]
    });

    client.release();

    return listId;
}

/**
 * Changes the name of the list with the given id
 */
async function updateList(listId, name) {
    await connectAndQuery([
        {
            query: `UPDATE ${LIST_TABLE} SET name=$1 WHERE id=$2;`,
            values: [name, listId]
        }
    ]);
    return await getList(listId);
}

/**
 * Removes the list with the given id
 */
async function removeList(listId) {
    const [result] = await connectAndQuery(
        { 
            query: `DELETE FROM ${LIST_TABLE} WHERE id = $1;`,
            values: [listId]
        }
    );
    return result;
}

/**
 * Returns a description of the list with the given id
 */
async function getList(listId) {
    const [items, name] = await connectAndQuery([
        {
            query: `SELECT id, name, timestamp, category_id, checked FROM ${ITEM_TABLE} WHERE list_id=$1 ORDER BY timestamp;`,
            values: [listId]
        },
        {
            query: `SELECT name FROM ${LIST_TABLE} WHERE id=$1;`,
            values: [listId]
        },
    ]);

    return {
        name: name.rows[0].name,
        items: items.rows
    };
}

module.exports = {
    createList,
    updateList,
    removeList,
    getList
};