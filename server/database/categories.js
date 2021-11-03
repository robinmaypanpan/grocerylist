const { ITEM_TABLE, CATEGORY_TABLE, CATEGORY_NONE } = require('./constants');
const { connectAndQuery, executeQueries } = require('./query');
const getClient = require('./getClient');
const { getList } = require('./list');

/**
 * Returns a list of categories for the given list id
 */
async function getCategories(listId) {
    const [nameQuery] = await connectAndQuery({
        query: `SELECT name, id from ${CATEGORY_TABLE} WHERE list_id=$1;`,
        values: [listId]
    });

    return nameQuery.rowCount > 0 ? nameQuery.rows : [];
}

/**
 * Updates the category's name
 */
async function updateCategory(name, categoryId, listId) {
    await connectAndQuery({
        query: `UPDATE ${CATEGORY_TABLE} SET name=$1 WHERE id=$2 AND list_id=$3;`,
        values: [name, categoryId, listId]
    });
    return await getList(listId);
}

/**
 * Deletes a category and all references to it
 */
async function removeCategory(categoryId, listId) {
    const client = await getClient();
    try {
        // Find the uncategorized category
        const [uncategorizedCategory] = await executeQueries(client,
            `SELECT id FROM ${CATEGORY_TABLE} WHERE name='${CATEGORY_NONE}';`
        );
        const uncategorizedId = uncategorizedCategory.rows[0].id;

        if (uncategorizedId === categoryId) {
            throw new Error('You can\'t delete the Uncategorized category!');
        }

        // Now find all the items with that category.
        const [itemsWithCategory] = await executeQueries(client,
            {
                query: `SELECT id FROM ${ITEM_TABLE} WHERE category_id=$2;`,
                values: [listId, categoryId]
            }
        );
        const ids = itemsWithCategory.rows.map(({id}) => id);

        // Now remove that category from all of those items
        await executeQueries(client,
            `UPDATE ${ITEM_TABLE} SET category_id=${uncategorizedId} WHERE id in (${ids.join()});`
        );
        
        // Delete the category entirely
        await executeQueries(client,
            {
                query: `DELETE FROM ${CATEGORY_TABLE} WHERE category_id=$1;`,
                values: [categoryId]
            }
        );
    } finally {
        client.release();
    }
    return await getList(listId);
}

/**
 * Returns either an existing category or a new category id for a given category names
 */
async function getCategoryId(client, listId, categoryName = CATEGORY_NONE) {
    if (!listId) throw new Error('Called getCategoryId with no list id');
    const [categoryIdRequest] = await executeQueries(client,
        {
            query: `SELECT id FROM ${CATEGORY_TABLE} WHERE name=$1 AND list_id=$2;`, 
            values: [categoryName, listId]
        }
    );
    if (categoryIdRequest.rowCount > 0) {
        console.log(`Category ${categoryName} exists!  yay!`);
        // The category exists!  Use it!
        return categoryIdRequest.rows[0].id;
    } else {
        console.log(`Creating category for ${categoryName}`);
        const [createCategoryRequest] = await executeQueries(client,
            {
                query: `INSERT INTO ${CATEGORY_TABLE} (name, list_id) VALUES ($1::text, $2) RETURNING id;`, 
                values: [categoryName, listId]
            }
        );
        return createCategoryRequest.rows[0].id;
    }
}

module.exports = {
    getCategories,
    removeCategory,
    updateCategory,

    getCategoryId
};