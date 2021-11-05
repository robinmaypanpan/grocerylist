const { META_TABLE, LIST_TABLE } = require('./constants');

/**
 * Queries the database to determine its version
 */
async function getVersion(trx) {
    console.log('Retrieving Database version');
    
    let version = 0;
    try {
        const [{value}] = await trx(META_TABLE)
            .where({key: 'version'})
            .select('value');
        version = parseInt(value, 10);
    } catch(error) {
        console.log('Metadata table does not exist. Checking for early version.');
    }

    if (version === 0) {
        try {
            await trx(LIST_TABLE)
                .select('*');
            version = 1;
        } catch (error) {
            console.log('No list table exists. Database not initialized.');
        }
    }

    return version;
}

module.exports = getVersion;