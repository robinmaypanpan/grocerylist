const makeKnex = require('knex');
let knex;
/**
 * Returns a knex client that can be used to access Postgres
 */
function getKnex() {
    if (!knex) {
        console.log('Connecting knex');
        knex = makeKnex({
            client: 'pg',
            connection: {
                connectionString: process.env.DATABASE_URL,
                ssl: process.env.NODE_ENV !== 'production' ? false : { rejectUnauthorized: false },
            }
        });
    }
    return knex;
}

module.exports = getKnex;