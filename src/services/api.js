/**
 * Validate the provided input.
 */
function validate(...args) {
    args.forEach((arg) => {
        if (!arg) throw new Error('Invalid arguments');
    });
}

async function callFetch(method, type = 'GET', data = {}) {
    validate(method);

    let options;
    let url = `/api/${method}`;
    let response;

    if (type === 'GET') {
        url += '?' + new URLSearchParams(data);
        response = await fetch(url);
    } else {
        options = {
            method: type, 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        response = await fetch(url, options);
    }

    return await response.json();
}

export async function getList(listId) {
    validate(listId);
    return await callFetch('getList', 'GET', {listId});
}

export async function createList(name) {
    validate(name);
    return await callFetch('createList', 'POST', {name});
}

export async function updateList(listId, name) {
    validate(listId);
    validate(name);
    return await callFetch('updateList', 'PUT', {listId, name});
}

export async function removeList(listId) {
    validate(listId);
    return await callFetch('removeList', 'DELETE', {listId});
}

export async function addItem(name, listId, categoryName, categoryOrder) {
    validate(listId);
    validate(name);
    validate(categoryName);
    return await callFetch('addItem', 'POST', {name, categoryName, listId, sortOrder: categoryOrder});
}

export async function updateItem(original, updates) {
    const newItem = {
        ...original,
        ...updates
    };

    validate(newItem.listId, 'updateItem provided with bad listId');
    validate(newItem.id || newItem.itemId, 'updateItem provided with bad item id');

    return await callFetch('updateItem', 'PUT', newItem);
}

export async function removeItem(itemId, listId) {
    validate(listId);
    validate(itemId);
    return await callFetch('removeItem', 'DELETE', {itemId, listId});
}

export async function removeChecked(listId){
    validate(listId);
    return await callFetch('removeChecked', 'DELETE', {listId});
}

export async function getCategories(listId) {
    validate(listId);
    return await callFetch('getCategories', 'GET', {listId});
}

export async function updateCategory(name, categoryId, sortOrder, listId) {
    validate(listId);
    validate(categoryId);
    return await callFetch('updateCategory', 'PUT', {name, categoryId, sortOrder, listId});
}

export async function removeCategory(categoryId, listId) {
    validate(categoryId);
    validate(listId);
    return await callFetch('removeCategory', 'DELETE', {categoryId, listId});
}