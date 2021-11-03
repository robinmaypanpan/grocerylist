async function callFetch(method, type = 'GET', data = {}) {
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
    return await callFetch('getList', 'GET', {listId});
}

export async function createList(name) {
    return await callFetch('createList', 'POST', {name});
}

export async function updateList(listId, name) {
    return await callFetch('updateList', 'PUT', {listId, name});
}

export async function removeList(listId) {
    return await callFetch('removeList', 'DELETE', {listId});
}

export async function addItem(name, listId, categoryName) {
    return await callFetch('addItem', 'POST', {name, categoryName, listId});
}

export async function updateItem(original, updates) {
    const newItem = {
        ...original,
        ...updates
    };
    return await callFetch('updateItem', 'PUT', newItem);
}

export async function removeItem(itemId, listId) {
    return await callFetch('removeItem', 'DELETE', {itemId, listId});
}

export async function getCategories(listId) {
    return await callFetch('getCategories', 'GET', {listId});
}

export async function updateCategory(name, categoryId, listId) {
    return await callFetch('updateCategory', 'PUT', {name, categoryId, listId});
}

export async function removeCategory(categoryId, listId) {
    return await callFetch('removeCategory', 'DELETE', {categoryId, listId});
}