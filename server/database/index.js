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
    let success = false;
    const client = await getClient();
    try {
        const version = await getVersion(client);

        console.log(`Database version is ${version}`);

        if (version === 0) {
            await initializeFreshDatabase(client);
        } else {
            await migrateDatabase(client, version);
        }
        
        success = true;
    } catch (error) {
        console.log('Something went wrong attempting to initialize database');
    } finally {
        client.release();
    };

    return {success};
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