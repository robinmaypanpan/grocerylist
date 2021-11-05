const getKnex = require('./getKnex');
const getVersion = require('./getVersion');
const initializeFreshDatabase = require('./initializeFreshDatabase');
const migrateDatabase = require('./migrateDatabase');

const { 
    createList,
    updateList,
    removeList,
    getList 
} = require('./list');

const {
    getCategories,
    removeCategory,
    updateCategory,
} = require('./categories');

const {
    addItem,
    updateItem,
    removeItem
} = require('./items');

async function initializeAndMigrateDatabase() {
    const knex = getKnex();
    try {
        return await knex.transaction(async function (trx) {
            console.log('Calling transaction');
            const version = await getVersion(trx);

            console.log(`Database version is ${version}`);

            if (version === 0) {
                await initializeFreshDatabase(trx);
            } else {
                await migrateDatabase(trx, version);
            }

            console.log('Database connection established');
            return {success: true};
        });
    } catch(error) {
        return {success: false, error};
    }
}


module.exports = {
    initializeAndMigrateDatabase,
    
    createList,
    updateList,
    removeList,
    getList, 

    getCategories,
    removeCategory,
    updateCategory,

    addItem,
    updateItem,
    removeItem
};