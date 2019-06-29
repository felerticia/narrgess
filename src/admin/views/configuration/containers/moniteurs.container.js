// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/moniteurs/list.component';
import Add from '../components/moniteurs/add.component';
import Edit from '../components/moniteurs/edit.component';

const Moniteurs = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/moniteurs'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/moniteurs/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Moniteurs</Header>
        <Switch>
            <Route path='/admin/configuration/moniteurs/list' component={List} />
            <Route path='/admin/configuration/moniteurs/add' component={Add} />
            <Route path='/admin/configuration/moniteurs/:id' component={Edit} />
            <Redirect to='/admin/configuration/moniteurs/list' />
        </Switch>
    </Segment>
);

Moniteurs.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Moniteurs;
