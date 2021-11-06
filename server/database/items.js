const { ITEM_TABLE, CATEGORY_TABLE, CATEGORY_NONE} = require('./constants');
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
                    category_id: categoryId,
                    timestamp: knex.raw('current_timestamp')
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
async function updateItem(itemId, name, listId, checked) {
    try {
        return await knex.transaction(async (trx) => {
            await trx(ITEM_TABLE)
                .where({id: itemId, list_id: listId})
                .update({
                    name,
                    checked
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
            // Find the uncategorized category
            const [{id: uncategorizedId}] = await trx(CATEGORY_TABLE)
                .where({name: CATEGORY_NONE})
                .select('id');

            console.log(`Got uncategorized id ${uncategorizedId}`);

            // Get the items category before removing it.
            const [{category_id: categoryId}] = await trx(ITEM_TABLE)
                .where({id: itemId, list_id: listId})
                .select('category_id');

            await trx(ITEM_TABLE)
                .where({id: itemId, list_id: listId})
                .delete();

            if (categoryId !== uncategorizedId) {
                // Now check to see if there's anything left with that category
                const items = await trx(ITEM_TABLE)
                    .where({category_id: categoryId})
                    .select('id');

                if (items.length === 0) {
                    console.log(`Removing category ${categoryId}`);

                    // Actually remove the category
                    await trx(CATEGORY_TABLE)
                        .where({id: categoryId})
                        .delete();
                }
            }

            return await getList(listId, trx);
        });
    } catch (error) {
        return {success: false, error};
    }
}
async function removeChecked(listId){
    try{
        return await knex.transaction(async (trx) => {
            // Find the uncategorized category
            const [{id: uncategorizedId}] = await trx(CATEGORY_TABLE)
                .where({name: CATEGORY_NONE})
                .select('id');

            // Get the categories before removing them.
            const categoryIds = await trx(ITEM_TABLE)
                .where({list_id: listId, checked: true})
                .select('category_id')
                .distinct()
                .pluck('category_id');

            console.log(`Category ids is ${JSON.stringify(categoryIds)}`);

            await trx(ITEM_TABLE)
                .where({list_id: listId, checked: true})
                .delete();

            // Now delete all of these categories
            categoryIds.forEach(async (categoryId) => {
                if (categoryId !== uncategorizedId) {
                    // Now check to see if there's anything left with that category
                    const items = await trx(ITEM_TABLE)
                        .where({category_id: categoryId})
                        .select('id');

                    console.log(`Found these items with this category ${JSON.stringify(items)}`);
    
                    if (items.length === 0) {
                        // Actually remove the category
                        await trx(CATEGORY_TABLE)
                            .where({id: categoryId})
                            .delete();
                    }
                }
            });
            
            return await getList(listId, trx);
        })
    } catch (error) {
        return {success: false, error};
    }
}

module.exports = {
    addItem,
    updateItem,
    removeItem,
    removeChecked
};