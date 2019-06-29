// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListEncaissements from '../components/listEncaissements.component';

const Encaissements = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Journal des encaissements</Header>
        <Switch>
            <Route path='/admin/comptabilite/encaissements/list' component={ListEncaissements} />
            <Route path='/admin/comptabilite/encaissements/:from/:to' component={ListEncaissements} />
            <Redirect to='/admin/comptabilite/encaissements/list' />
        </Switch>
    </Segment>
);

Encaissements.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Encaissements;
