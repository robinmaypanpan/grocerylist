const { ITEM_TABLE, META_TABLE, CURRENT_VERSION } = require('./constants');
const { executeQueries } = require('./query');

async function migrateDatabase(client, version) {
    // Apply migrations
    if (version === 1) {
        console.log('Migrating database to version 2');
        const queries = [
            `CREATE TABLE IF NOT EXISTS ${META_TABLE} ( \
                key text unique, \
                value text
            );`,
            `ALTER TABLE ${ITEM_TABLE} \
            ADD COLUMN checked boolean DEFAULT false \
            ;`,
        ];
        await executeQueries(client, queries);
        version++;
    }

    await client.query(`INSERT INTO ${META_TABLE} (key, value)\
        VALUES ('version', ${CURRENT_VERSION}) \
        ON CONFLICT (key) \
        DO UPDATE SET value=${CURRENT_VERSION} \
    ;`);

    console.log('Database is up to date.');
}

module.exports = migrateDatabase;