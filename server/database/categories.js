const { ITEM_TABLE, CATEGORY_TABLE, CATEGORY_NONE } = require('./constants');
const knex = require('./getKnex')();
const { getList } = require('./list');

/**
 * Returns a list of categories for the given list id
 */
async function getCategories(listId) {
    try {
        const categories = await knex(CATEGORY_TABLE).where({list_id: listId});
        return {categories, success: true};
    } catch (error) {
        return {success: false, error};
    }
}

/**
 * Updates the category's name
 */
async function updateCategory(name, categoryId, listId) {
    try {
        await knex(CATEGORY_TABLE)
            .where({id: categoryId, list_id: listId})
            .update({name});

        return {success: true};
    } catch (error) {
        return {success: false, error};
    }
}

/**
 * Deletes a category and all references to it
 */
async function removeCategory(categoryId, listId) {
    try {
        return await knex.transaction(async (trx) => {
            // Find the uncategorized category
            const [{id: uncategorizedId}] = await trx(CATEGORY_TABLE)
                .where({name: CATEGORY_NONE})
                .select('id');

            if (uncategorizedId === categoryId) {
                throw new Error('You can\'t delete the Uncategorized category!');
            }

            // Reset all categories to the uncategorized category for this list.
            await trx(ITEM_TABLE)
                .where({category_id: categoryId})
                .update({category_id: uncategorizedId});

            // Actually remove the category
            await trx(CATEGORY_TABLE)
                .where({category_id: categoryId})
                .delete();

            return await getList(listId, trx);
        });
    } catch (error) {
        return {success: false, error};
    }
}

/**
 * Returns either an existing category or a new category id for a given category names
 */
async function getOrCreateCategoryId(trx, listId, categoryName, sortOrder) {
    // console.log(`Obtaining category for ${categoryName}`);
    const categoryResults = await trx(CATEGORY_TABLE)
        .where({name: categoryName, list_id: listId})
        .select('id');

    if (categoryResults.length > 0 ){
        const [{id: categoryId}] = categoryResults;
        // console.log(`Category ${categoryName} exists with id ${categoryId}!  yay!`);
        return categoryId;
    } else {
        // console.log(`Creating category for ${categoryName}`);

        const [categoryId] = await trx(CATEGORY_TABLE)
            .insert({name: categoryName, list_id: listId, sort_order: sortOrder})
            .returning('id');

        // console.log(`The new category id is ${categoryId}`);

        return categoryId;
    }
}

module.exports = {
    getCategories,
    removeCategory,
    updateCategory,

    getOrCreateCategoryId
};