jest.mock('./query', () => { 
    return {
        executeQueries: jest.fn(), 
        connectAndQuery: jest.fn() 
    };
});
const mockQuery = require('./query');

const getVersion = require('./getVersion');

describe('getVersion', () => {
    test('it returns a version if in the db', async () => {
        const mockVersionResults = [{
            rows: [{value: 124}]
        }];
        mockQuery.executeQueries.mockReturnValueOnce(mockVersionResults);
        const version = await getVersion();
        expect(version).toEqual(124);
    });

    test('it returns 0 if the database has nothing in it', async () => {
        mockQuery.executeQueries
            .mockImplementationOnce(() => { throw new Error()})
            .mockImplementationOnce(() => { throw new Error()});
        const version = await getVersion();
        expect(version).toEqual(0);
    });

    test('it returns 1 if the database is partially setup but does not have version', async () => {
        mockQuery.executeQueries
            .mockImplementationOnce(() => { throw new Error()})
            .mockImplementationOnce(() => {
                return [{
                    rows: [{value:0}]
                }];
            });
        const version = await getVersion();
        expect(version).toEqual(1);
    });
});