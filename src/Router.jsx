import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import NewList from './routes/NewList';
import ViewList from './routes/ViewList';
import AddNewItem from './routes/AddNewItem';
import EditCategory from './routes/EditCategory';
import EditItem from './routes/EditItem';

export default function Router() {
    return (
        <BrowserRouter>
            <QueryParamProvider>
                <Switch>
                    <Route path='/editCategory/:listId/:categoryId' component={EditCategory}/>
                    <Route path='/editItem/:listId/:itemId' component={EditItem}/>
                    <Route path='/addNewItem/:listId' component={AddNewItem}/>
                    <Route path='/list/:listId' component={ViewList}/>
                    <Route exact path='/' component={NewList}/>
                </Switch>
            </QueryParamProvider>
        </BrowserRouter>
    );
}