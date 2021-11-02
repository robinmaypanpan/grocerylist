const { META_TABLE, LIST_TABLE, CATEGORY_TABLE, ITEM_TABLE, CURRENT_VERSION } = require('./constants');
const { executeQueries } = require('./query');

async function initializeFreshDatabase(client) {
    console.log('Fully initializing fresh database');
        
    const queries = [
        `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
        `CREATE TABLE IF NOT EXISTS ${META_TABLE} ( \
            key text unique, \
            value text \
        );`,
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
            `id serial unique PRIMARY KEY \
            name text, \
            timestamp date, \
            category_id integer, \
            list_id uuid, \
            checked boolean DEFAULT false, \
            CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES ${CATEGORY_TABLE}(id), \
            CONSTRAINT fk_list FOREIGN KEY(list_id) REFERENCES ${LIST_TABLE}(id) ON DELETE CASCADE \
        );`,
        `INSERT INTO ${META_TABLE} (key, value) \
            VALUES ('version', ${CURRENT_VERSION}) \
        ;`
    ];
    await executeQueries(client, queries);
}

module.exports = initializeFreshDatabase;