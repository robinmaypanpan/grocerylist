const { LIST_TABLE, ITEM_TABLE, META_TABLE, CATEGORY_TABLE, CURRENT_VERSION } = require('./constants');

async function migrateDatabase(knex, version) {
    // Apply migrations
    if (version === 1) {
        console.log('Migrating database to version 2');
        await Promise.all([
            knex.schema.createTable(META_TABLE, (table) => {
                table.text('key').unique();
                table.text('value');
            }),
            knex.schema.alterTable(ITEM_TABLE, (table) => {
                table.boolean('checked').defaultTo(false);
            }),
        ]);
        version++;
    }

    if (version === 2) {
        console.log('Migrating database to version 3');

        await Promise.all([
            knex.schema.alterTable(ITEM_TABLE, (table) => {
                table.timestamp('timestamp');
            }),
            knex.schema.alterTable(LIST_TABLE, (table) => {
                table.timestamp('timestamp');
            }),
        ]);

        version++;
    }

    if (version === 3) {
        console.log('Migrating database to version 4');

        await knex.schema.alterTable(CATEGORY_TABLE, (table) => {
            table.integer('sort_order').defaultTo(0);
        });

        version++;
    }

    await knex(META_TABLE)
        .insert({key: 'version', value: CURRENT_VERSION})
        .onConflict('key').merge();

    console.log('Database is up to date.');
}

module.exports = migrateDatabase;