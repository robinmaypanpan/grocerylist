const { Pool } = require('pg');

const ITEM_TABLE = 'item_table';
const LIST_TABLE = 'list_table';
const CATEGORY_TABLE = 'category_table';

const CATEGORY_NONE = 'Uncategorized';

const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: false
      });
  } else {
      return new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
            }
      });
  } 
})();

function normalizeQueries(input) {
    if (typeof input === 'string') {
        return [{
            query: input,
            values: []
        }];
    }

    if (Array.isArray(input)) {
        return input.map((query) => {
            if (typeof query === 'string') {
                return {
                    query,
                    values: []
                };
            } else {
                return query;
            }
        });
    }

    return [input];
}

function connectAndQuery(input) {
    const normalizedQueries = normalizeQueries(input);
    return new Promise(async (resolve, reject) => {
        const client = await pool.connect();
        try {
            const allQueryPromises = Promise.all(normalizedQueries.map(({query, values}) => {
                console.log(`Executing Query ${query}`);
                return client.query(query, values) 
            }));
            const results = await allQueryPromises;
            client.release();
            resolve(results);
        } catch (err) {
            console.error(err);
            if (client) client.release();
            reject("Error " + err);
        }
    });
}

async function initializeDatabase() {
    const result = await connectAndQuery([
        `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
        `CREATE TABLE IF NOT EXISTS ${LIST_TABLE} (` +
            `id uuid unique PRIMARY KEY,` +
            `name text,` +
            `timestamp date` +
        `);`,
        `CREATE TABLE IF NOT EXISTS ${CATEGORY_TABLE} (` +
            `id serial unique PRIMARY KEY, ` +
            `name text, ` +
            `list_id uuid, ` +
            `CONSTRAINT fk_list FOREIGN KEY(list_id) REFERENCES ${LIST_TABLE}(id) ON DELETE CASCADE` +
        `);`,
        `CREATE TABLE IF NOT EXISTS ${ITEM_TABLE} (` +
            `id serial unique PRIMARY KEY,` +
            `name text,` +
            `timestamp date,` +
            `category_id integer, ` + 
            `list_id uuid, ` +
            `CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES ${CATEGORY_TABLE}(id), ` +
            `CONSTRAINT fk_list FOREIGN KEY(list_id) REFERENCES ${LIST_TABLE}(id) ON DELETE CASCADE` +
        `);`
    ]);
    return result;
}

async function createList(name) {
    const [result] = await connectAndQuery([
        {
            query: `INSERT INTO ${LIST_TABLE} VALUES(uuid_generate_v4(), $1) RETURNING *;`,
            values: [name]
        }
    ]);
    const listId = result.rows[0].id;

    await connectAndQuery({
        query: `INSERT INTO ${CATEGORY_TABLE} (name, list_id) VALUES ($1, $2);`,
        values: [CATEGORY_NONE, listId]
    });

    return await getList(listId);
}

async function updateList(listId, name) {
    await connectAndQuery([
        {
            query: `UPDATE ${LIST_TABLE} SET name=$1 WHERE id=$2;`,
            values: [name, listId]
        }
    ]);
    return await getList(listId);
}

async function removeList(listId) {
    const [result] = await connectAndQuery(
        { 
            query: `DELETE FROM ${LIST_TABLE} WHERE id = $1;`,
            values: [listId]
        }
    );
    return result;
}

async function getList(listId) {
    const [items, name] = await connectAndQuery([
        {
            query: `SELECT id, name, timestamp, category_id FROM ${ITEM_TABLE} WHERE list_id=$1 ORDER BY timestamp;`,
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

async function getCategories(listId) {
    const [nameQuery] = await connectAndQuery({
        query: `SELECT name, id from ${CATEGORY_TABLE} WHERE list_id=$1;`,
        values: [listId]
    });

    return nameQuery.rowCount > 0 ? nameQuery.rows : [];
}

async function updateCategory(name, categoryId, listId) {
    await connectAndQuery({
        query: `UPDATE ${CATEGORY_TABLE} SET name=$1 WHERE id=$2 AND list_id=$3;`,
        values: [name, categoryId, listId]
    });
    return await getList(listId);
}

async function removeCategory(categoryId, listId) {
    const client = await pool.connect();
    try {
        // Find the uncategorized category
        const uncategorizedCategory = await client.query(
            `SELECT id FROM ${CATEGORY_TABLE} WHERE name='${CATEGORY_NONE}';`
        );
        const uncategorizedId = uncategorizedCategory.rows[0].id;

        if (uncategorizedId === categoryId) {
            throw new Error('You can\'t delete the Uncategorized category!');
        }

        // Now find all the items with that category.
        const itemsWithCategory = await client.query(
            `SELECT id FROM ${ITEM_TABLE} WHERE category_id=$2;`,
            [listId, categoryId]
        );
        const ids = itemsWithCategory.rows.map(({id}) => id);

        // Now remove that category from all of those items
        await client.query(
            `UPDATE ${ITEM_TABLE} SET category_id=${uncategorizedId} WHERE id in (${ids.join()});`
        );
        
        // Delete the category entirely
        await client.query(
            `DELETE FROM ${CATEGORY_TABLE} WHERE category_id=$1;`,
            [categoryId]
        );
    } finally {
        client.release();
    }
    return await getList(listId);
}

async function getCategoryId(client, listId, categoryName = CATEGORY_NONE) {
    const categoryIdRequest = await client.query(
        `SELECT id FROM ${CATEGORY_TABLE} WHERE name=$1 AND list_id=$2;`, [categoryName, listId]
    );
    if (categoryIdRequest.rowCount > 0) {
        console.log(`Category ${categoryName} exists!  yay!`);
        // The category exists!  Use it!
        return categoryIdRequest.rows[0].id;
    } else {
        console.log(`Creating category for ${categoryName}`);
        const createCategoryRequest = await client.query(
            `INSERT INTO ${CATEGORY_TABLE} (name, list_id) VALUES ($1::text, $2) RETURNING id;`, [categoryName, listId]
        );
        return createCategoryRequest.rows[0].id;
    }
}

// This function is weird because we have a lot of layers to it and need to keep the connection open for a while.
async function addItem(name, listId, categoryName) {
    const client = await pool.connect();
    try {
        const categoryId = await getCategoryId(client, listId, categoryName);
        await client.query(
            `INSERT INTO ${ITEM_TABLE} (name, timestamp, list_id, category_id) \
                    VALUES ($1::text, current_timestamp, $2, $3);`,
            [
                name,
                listId,
                categoryId
            ]
        ); 
    } finally {
        client.release();
    }
    return await getList(listId);
}

async function updateItem(itemId, name, listId, categoryName) {
    const client = await pool.connect();
    try {
        const categoryId = await getCategoryId(client, listId, categoryName);
        await client.query(
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
    initializeDatabase,
    
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
};
