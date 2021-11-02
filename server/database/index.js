const getClient = require('./getClient');
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
    const client = await getClient();
    const version = await getVersion(client);

    console.log(`Database version is ${version}`);

    if (version === 0) {
        await initializeFreshDatabase(client);
    } else {
        await migrateDatabase(client, version);
    }
    
    client.release();

    return {success: true};
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