// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import Admin from '../admin/';
import CGU from '../policy/cgu.component';
import AccountManagement from '../accountManagement/';

const RouteAdmin = props => {
    document.body.style.backgroundColor = "#E0E1E1";
    return (
        <Router>
            <Switch>
                <Route path='/admin' component={p => <Admin {...p} userLevel={props.userLevel} />} />
                <Route path='/privacyPolicy' component={CGU} />
                <Route path='/accountManagement' component={AccountManagement} />
                <Redirect to='/admin' />
            </Switch>
        </Router>
    );
}

RouteAdmin.propTypes = {
    type: PropTypes.string,
};

export default RouteAdmin;