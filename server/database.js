const { Pool } = require('pg');

const GROCERY_LIST_TABLE = 'grocerylist_table';

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

function connectAndQuery(query) {
    return new Promise(async (resolve, reject) => {
        const client = await pool.connect();
        try {
            const result = await client.query(query);
            client.release();
            resolve(result);
        } catch (err) {
            console.error(err);
            if (client) client.release();
            reject("Error " + err);
        }
    });
}

async function initializeDatabase() {
    return await connectAndQuery(
        `CREATE TABLE IF NOT EXISTS ${GROCERY_LIST_TABLE} (` +
        `id serial unique,` +
        `name text unique,` +
        `timestamp date,` +
        `category_id integer ` +
        `);`
    );
}

async function getItems() {
    const result = await connectAndQuery(
        `SELECT * FROM ${GROCERY_LIST_TABLE};`
    );
    const results = result ? result.rows : [];
    return results.map((item) => {
        const newItem = {};
        Object.keys(item).forEach((itemProp) => {
            if (item[itemProp]) {
                newItem[itemProp] = item[itemProp];
            }
        });
        return newItem;
    });;
}

async function addItem(name, categoryId = 0) {
    return await connectAndQuery(
        `INSERT INTO ${GROCERY_LIST_TABLE} (name, timestamp, category_id) \
        VALUES ('${name}', current_timestamp, ${categoryId}) \
        RETURNING *;`
    ); 
}

async function removeItem(id, name) {
    if (id) {
        return await connectAndQuery(
            `DELETE FROM ${GROCERY_LIST_TABLE} \
            WHERE id = ${id} \
            RETURNING *;`
        );
    } else if (name) {
        return await connectAndQuery(
            `DELETE FROM ${GROCERY_LIST_TABLE} \
            WHERE name = ${name} \
            RETURNING *;`
        );
    } else {
        throw new Error('No removal key provided');
    }
}

module.exports = {
    initializeDatabase,
    getItems, 
    addItem,
    removeItem
};
