import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './routes/Home';
import List from './routes/List';
import AddNewItem from './routes/AddNewItem';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/addNewItem/:listId' component={AddNewItem}/>
                <Route path='/list/:listId' component={List}/>
                <Route exact path='/' component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}