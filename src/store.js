
import { createStore } from 'redux';

import listReducer from './reducers/listReducer';

const initialState = {list: []};

export default createStore(listReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);