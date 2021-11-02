const { META_TABLE, LIST_TABLE } = require('./constants');
const { executeQueries } = require('./query');

/**
 * Queries the database to determine its version
 */
async function getVersion(client) {
    console.log('Retrieving Database version');
    
    let version = 0;
    try {
        const results = await executeQueries(client, `SELECT value FROM ${META_TABLE} WHERE key='version';`);
        const versionRcvd = results.rows[0].value
        if (versionRcvd) {
            version = Number(versionRcvd);
        }
    } catch(error) {
        console.log('Metadata table does not exist. Checking for early version.');
    }

    if (version === 0) {
        try {
            await executeQueries(client, `SELECT * from ${LIST_TABLE};`);
            version = 1;
        } catch (error) {
            console.log('No list table exists. Database not initialized.');
        }
    }
}

module.exports = getVersion;