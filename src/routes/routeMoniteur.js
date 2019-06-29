// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Local
import Moniteur from '../moniteur/';
import CGU from '../policy/cgu.component';
import AccountManagement from '../accountManagement/';

const RouteMoniteur = () => {
    document.body.style.backgroundColor = "#E0E1E1";
    return (
        <Router>
            <Switch>
                <Route path='/moniteur' component={Moniteur} />
                <Route path='/privacyPolicy' component={CGU} />
                <Route path='/accountManagement' component={AccountManagement} />
                <Redirect to='/moniteur' />
            </Switch>
        </Router>
    );
}

export default RouteMoniteur;