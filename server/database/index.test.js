jest.mock('./getClient', () => { 
    const mockClient = {
        query: Promise.resolve(jest.fn()),
        release: jest.fn()
    };
    return jest.fn(() => {
        return Promise.resolve(mockClient);
    });
});
const mockGetClient = require('./getClient');
jest.mock('./getVersion');
const mockGetVersion = require('./getVersion');
jest.mock('./initializeFreshDatabase');
const mockInitializeFreshDatabase = require('./initializeFreshDatabase');
jest.mock('./migrateDatabase');
const mockMigrateDatabase = require('./migrateDatabase');

const {initializeAndMigrateDatabase} = require('./index');

describe('initializeAndMigrateDatabase', () => {
    test('initializes a fresh DB on version 0', async () => {
        mockGetVersion.mockResolvedValue(0);
        const mockClient = await mockGetClient();
        await expect(initializeAndMigrateDatabase()).resolves.toEqual({success: true});
        expect(mockGetVersion).toHaveBeenCalledWith(mockClient);
        expect(mockInitializeFreshDatabase).toHaveBeenCalledWith(mockClient);
    });
    test('calls migrate Database for any other version', async () => {
        mockGetVersion.mockResolvedValue(1);
        const mockClient = await mockGetClient();
        await expect(initializeAndMigrateDatabase()).resolves.toEqual({success: true});
        expect(mockGetVersion).toHaveBeenCalledWith(mockClient);
        expect(mockMigrateDatabase).toHaveBeenCalledWith(mockClient, 1);
    });
    test('calls client.release', async () => {
        const mockClient = await mockGetClient();
        await initializeAndMigrateDatabase();
        expect(mockClient.release).toHaveBeenCalled();
    });
    test('calls client.release if something fails', async () => {
        mockGetVersion.mockImplementationOnce(() => {
            throw new Error('Dummy')
        });
        const mockClient = await mockGetClient();
        await initializeAndMigrateDatabase();
        expect(mockClient.release).toHaveBeenCalled();
    });
    test('returns success = false if something fails', async () => {
        mockGetVersion.mockImplementationOnce(() => {
            throw new Error('Dummy')
        });
        await expect(initializeAndMigrateDatabase()).resolves.toEqual({success: false});
    });
});