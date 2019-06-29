// React
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from './containers/list.container';
import Eleve from './containers/eleve.container';

const Eleves = props => (
    <Container>
        <Switch>
            <Route path='/admin/eleves/list' component={List} />
            <Route path='/admin/eleves/:id' component={p => <Eleve {...p} type={props.type} />} />
            <Redirect to='/admin/eleves/list' />
        </Switch>
    </Container>
);

Eleves.propTypes = {
    type: PropTypes.string,
};

export default Eleves;
