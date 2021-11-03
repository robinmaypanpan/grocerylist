const { Pool } = require('pg');

function createPool() {
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
}
  
const pool = createPool();

/**
 * Returns a client that can be used to access Postgres
 */
async function getClient() {
    return await pool.connect();
}

module.exports = getClient;