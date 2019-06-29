// React
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Local requirement
import Planning from '../views/planning/';
import Eleves from '../views/eleves/';
import Compte from '../views/compte/';

const Routes = () => (
    <Switch>
        <Route path='/moniteur/planning' component={Planning} />
        <Route path='/moniteur/eleves' component={Eleves} />
        <Route path='/moniteur/compte' component={Compte} />
        <Redirect to='/moniteur/planning' />
    </Switch>
);

export default Routes;