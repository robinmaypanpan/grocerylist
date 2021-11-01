import { BrowserRouter, Switch, Route} from 'react-router-dom';

import NewList from './routes/NewList';
import ViewList from './routes/ViewList';
import AddNewItem from './routes/AddNewItem';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/addNewItem/:listId' component={AddNewItem}/>
                <Route path='/list/:listId' component={ViewList}/>
                <Route exact path='/' component={NewList}/>
            </Switch>
        </BrowserRouter>
    );
}