jest.mock('./query', () => { 
    return {
        executeQueries: jest.fn(), 
    };
});
const mockQuery = require('./query');

const mockClient = {};

const initializeFreshDatabase = require('./initializeFreshDatabase');

describe('initializeFreshDatabase', () => {
    test('Calls execute Queries with a bunch of queries', async () => {
        await initializeFreshDatabase(mockClient);
        expect(mockQuery.executeQueries).toHaveBeenCalled();
        const [callClient, callQueries] = mockQuery.executeQueries.mock.calls[0];
        expect(callClient).toBe(mockClient);
        expect(callQueries.length).toBeGreaterThan(5);
    });
});