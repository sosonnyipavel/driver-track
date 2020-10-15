import React from 'react';
import Auth from './Auth';
import Manager from './Manager';
import history from '../history';
import { Router, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/" exact component={Manager} />
                        <Route exact path='/signin' component ={Auth} />
                    </Switch>
                </div>
            </Router>
        </div> 
    );
}

export default App;