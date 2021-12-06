const { META_TABLE, LIST_TABLE } = require('./constants');

/**
 * Queries the database to determine its version
 */
async function getVersion(trx) {
    // console.log('Retrieving Database version');
    
    const metaTableExists = await trx.schema.hasTable(META_TABLE);
    const listTableExists = await trx.schema.hasTable(LIST_TABLE);

    if (metaTableExists) {
        const [{value: version}] = await trx(META_TABLE)
            .where({key: 'version'})
            .select('value');
        return parseInt(version, 10);
    } else if (listTableExists) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = getVersion;