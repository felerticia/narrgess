// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListVentes from '../components/listVentes.component';

const Ventes = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Journal des ventes</Header>
        <Switch>
            <Route path='/admin/comptabilite/ventes/list' component={ListVentes} />
            <Route path='/admin/comptabilite/ventes/:from/:to' component={ListVentes} />
            <Redirect to='/admin/comptabilite/ventes/list' />
        </Switch>
    </Segment>
);

Ventes.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Ventes;
