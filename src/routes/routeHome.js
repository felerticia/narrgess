// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Local - general
import ResponsiveContainer from '../general/containers/responsiveContainer.component';

// Routes Home
import Home from '../home/views/home';
import ForfaitsCode from '../home/views/forfaitsCode';
import ForfaitsPermis from '../home/views/forfaitsPermis';
import Team from '../home/views/team';
import PreInscription from '../home/views/preInscription';

// Routes Login and else
import Login from '../login';
import CGU from '../policy/cgu.component';
import AccountManagement from '../accountManagement';

const RouteHome = () => {
    document.body.style.backgroundColor = "#f2f2f2";
    return (
        <Router>
            <ResponsiveContainer>
                <Switch>
                    <Route path='/home/home' component={Home} />
                    <Route path='/home/forfaitsCode' component={ForfaitsCode} />
                    <Route path='/home/forfaitsPermis' component={ForfaitsPermis} />
                    <Route path='/home/team' component={Team} />
                    <Route path='/home/preInscription/:forfait' component={PreInscription} />
                    <Route path='/login' component={Login} />
                    <Route path='/forgot' component={Login} />
                    <Route path='/signin' component={Login} />
                    <Route path='/privacyPolicy' component={CGU} />
                    <Route path='/accountManagement' component={AccountManagement} />
                    <Redirect to='/home/home' />
                </Switch>
            </ResponsiveContainer>
        </Router>
    );
}

export default RouteHome;