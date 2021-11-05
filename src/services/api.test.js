import {updateItem} from './api';

const originalMock = {
    id: 5,
    listId: 'testList',
    name: 'thingy'
};

const updateMock = {
    name: 'newThingy'
};

beforeEach(() => {
jest
  .spyOn(global, 'fetch')
  .mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );
});

describe('api', () => {
    describe('updateItem', () => {
        test('calls fetch', async () => {
            await updateItem(originalMock, updateMock);
            expect(fetch).toHaveBeenCalled();
        });
        
        test('calls fetch with correct parameters', async () => {
            await updateItem(originalMock, updateMock);
            const [url, options] = fetch.mock.calls[0];
            
            expect(url).toBe('/api/updateItem');

            const body = JSON.stringify({
                id: 5,
                listId: 'testList',
                name: 'newThingy'
            });

            expect(options).toEqual({
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            });
        });

        test('throws an exeption without a list id or id', async () => {
            await expect(updateItem({foo:'bar'},{}))
                .rejects
                .toThrow();
        });


    });
});
