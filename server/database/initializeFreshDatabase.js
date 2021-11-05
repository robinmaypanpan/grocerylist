const { META_TABLE, LIST_TABLE, CATEGORY_TABLE, ITEM_TABLE, CURRENT_VERSION } = require('./constants');

async function initializeFreshDatabase(knex) {
    console.log('Fully initializing fresh database');

    // Get our extension setup first.
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await Promise.all([   
        knex.schema.createTable(META_TABLE, (table) => {
            table.text('key').unique();
            table.text('value');
        }),
        knex.schema.createTable(LIST_TABLE, (table) => {
            table.uuid('id').unique().primary();
            table.text('name');
            table.timestamp('timestamp');
            // TODO: Migrate to table.timestamps
            // table.timestamps();
        }),
        knex.schema.createTable(CATEGORY_TABLE, (table) => {
            table.increments();
            table.text('name');
            table.uuid('list_id');
            table.foreign('list_id').references(`${LIST_TABLE}.id`)
                .onDelete('cascade');
        }),
        knex.schema.createTable(ITEM_TABLE, (table) => {
            table.increments();
            table.text('name');
            table.timestamp('timestamp');
            // TODO: Migrate to table.timestamps
            // table.timestamps();
            table.integer('category_id');
            table.uuid('list_id');
            table.boolean('checked').defaultTo(false);

            table.foreign('list_id').references(`${LIST_TABLE}.id`)
                .onDelete('cascade');
            table.foreign('category_id').references(`${CATEGORY_TABLE}.id`)
                .onDelete('cascade');
        })
    ]);

    await knex(META_TABLE).insert({key: 'version', value: CURRENT_VERSION});
}

module.exports = initializeFreshDatabase;