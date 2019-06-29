// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Local
import Eleve from '../eleve/';
import CGU from '../policy/cgu.component';
import AccountManagement from '../accountManagement/';

const RouteEleve = () => {
    document.body.style.backgroundColor = "#E0E1E1";
    return (
        <Router>
            <Switch>
                <Route path='/eleve' component={Eleve} />
                <Route path='/privacyPolicy' component={CGU} />
                <Route path='/accountManagement' component={AccountManagement} />
                <Redirect to='/eleve' />
            </Switch>
        </Router>
    );
}

export default RouteEleve;