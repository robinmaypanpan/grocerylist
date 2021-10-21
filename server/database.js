const { Pool } = require('pg');

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

module.exports = {
    connectAndQuery
};
