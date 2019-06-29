// React
import React from 'react';
import PropTypes from 'prop-types';

// Login
import HomeRoute from './routeHome';
import AdminRoute from './routeAdmin';
import EleveRoute from './routeEleve';
import MoniteurRoute from './routeMoniteur';

const Routing = props => {
    if (props.user) {
        if (props.user.type === 'admin' || props.user.type === 'secretaire') return <AdminRoute userLevel={props.user.level} />;
        if (props.user.type === 'eleve') return <EleveRoute />;
        if (props.user.type === 'moniteur') return <MoniteurRoute />;
    }
    return <HomeRoute />;
}

Routing.propTypes = {
    user: PropTypes.object,
};

export default Routing;
