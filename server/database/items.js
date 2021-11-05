const { ITEM_TABLE } = require('./constants');
const { getOrCreateCategoryId } = require('./categories');
const { getList } = require('./list');
const knex = require('./getKnex')();

/**
 * Adds the provided item, with list id and category name, to the database
 */
async function addItem(name, listId, categoryName) {
    try {
        return await knex.transaction(async (trx) => {
            const categoryId = await getOrCreateCategoryId(trx, listId, categoryName);
            await trx(ITEM_TABLE)
                .insert({
                    name,
                    list_id: listId,
                    category_id: categoryId
                });
            return await getList(listId, trx);
        });
    } catch (error) {
        return {success: false, error};
    }
}

/**
 * Changes the name and category for a given item.
 */
async function updateItem(itemId, name, listId, categoryName, checked) {
    try {
        return await knex.transaction(async (trx) => {
            const categoryId = await getOrCreateCategoryId(trx, listId, categoryName);
            await trx(ITEM_TABLE)
                .where({id: itemId, list_id: listId})
                .update({
                    name,
                    checked,
                    category_id: categoryId
                });
            return await getList(listId, trx);
        });
    } catch (error) {
        return {success: false, error};
    }
}

/**
 * removes a given item from the database
 */
async function removeItem(itemId, listId) {
    try {
        return await knex.transaction(async (trx) => {
            await trx(ITEM_TABLE)
                .where({id: itemId, list_id: listId})
                .delete();
            return await getList(listId, trx);
        });
    } catch (error) {
        return {success: false, error};
    }
}

module.exports = {
    addItem,
    updateItem,
    removeItem
};