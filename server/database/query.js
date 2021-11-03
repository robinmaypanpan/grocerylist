const getClient = require('./getClient');

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

/**
 * Provided a client and a list of queries, executes those queries.
 * Does not provide any error checking.s
 */
async function executeQueries(client, input) {
    const normalizedQueries = normalizeQueries(input);
    const allQueryPromises = Promise.all(normalizedQueries.map(({query, values}) => {
        console.log(`Executing Query ${query}`);
        return client.query(query, values) 
    }));
    return await allQueryPromises;
}

/**
 * Helpful utility that opens a client, makes a bunch of queries, then safely
 * and correctly closes that client.
 */
function connectAndQuery(input) {
    return new Promise(async (resolve, reject) => {
        const client = await getClient();
        try {
            const results = await executeQueries(client, input);
            client.release();
            resolve(results);
        } catch (err) {
            console.error(err);
            if (client) client.release();
            reject("Error " + err);
        }
    });
}

module.exports = {
    executeQueries,
    connectAndQuery
};