const { LIST_TABLE, CATEGORY_NONE, CATEGORY_TABLE, ITEM_TABLE } = require('./constants');
const knex = require('./getKnex')();

/**
 * Creates a new list and returns its id
 */
async function createList(name) {
    return await knex.transaction(async (trx) => {
        const [{id: listId}] = await trx(LIST_TABLE)
            .insert({id: knex.raw('uuid_generate_v4()'), name})
            .returning('*');

        await trx(CATEGORY_TABLE)
            .insert({list_id: listId, name: CATEGORY_NONE});

        return listId;
    });
}

/**
 * Changes the name of the list with the given id
 */
async function updateList(listId, name) {
    await knex(LIST_TABLE)
        .where({id: listId})
        .update({name});

    return await getList(listId);
}

/**
 * Removes the list with the given id
 */
async function removeList(listId) {
    try {
        await knex(LIST_TABLE)
            .where({id: listId})
            .delete();
        return {success: true}
    } catch (error) {
        return {success: false, error};
    }
}

/**
 * Returns a description of the list with the given id
 */
async function getList(listId, trx = knex) {
    try {
        const [{name}] = await trx(LIST_TABLE)
            .where({id: listId})
            .select('name');

        const items = await trx(ITEM_TABLE)
            .where({list_id: listId})
            .select('id', 'name', 'timestamp', 'category_id', 'checked')
            .orderBy([{column: 'timestamp', order: 'desc'}, 'category_id', 'id']);
        return {success: true, name, items};
    } catch(error) {
        return {success: false, error};
    }
}

module.exports = {
    createList,
    updateList,
    removeList,
    getList
};