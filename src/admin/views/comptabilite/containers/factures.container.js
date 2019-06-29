// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListFactures from '../components/listFactures.component';

const Factures = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Historique des factures</Header>
        <Switch>
            <Route path='/admin/comptabilite/factures/list' component={ListFactures} />
            <Route path='/admin/comptabilite/factures/:from/:to' component={ListFactures} />
            <Redirect to='/admin/comptabilite/factures/list' />
        </Switch>
    </Segment>
);

Factures.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Factures;
