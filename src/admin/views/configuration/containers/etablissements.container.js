// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/etablissements/list.component';
import Add from '../components/etablissements/add.component';
import Edit from '../components/etablissements/edit.component';

const Etablissements = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/etablissements'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/etablissements/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Etablissements</Header>
        <Switch>
            <Route path='/admin/configuration/etablissements/list' component={List} />
            <Route path='/admin/configuration/etablissements/add' component={Add} />
            <Route path='/admin/configuration/etablissements/:id' component={Edit} />
            <Redirect to='/admin/configuration/etablissements/list' />
        </Switch>
    </Segment>
);

Etablissements.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Etablissements;
