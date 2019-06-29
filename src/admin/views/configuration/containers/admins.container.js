// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/admins/list.component';
import Add from '../components/admins/add.component';
import Edit from '../components/admins/edit.component';

const Admins = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/admins'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/admins/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Administrateurs</Header>
        <Switch>
            <Route path='/admin/configuration/admins/list' component={List} />
            <Route path='/admin/configuration/admins/add' component={Add} />
            <Route path='/admin/configuration/admins/:id' component={Edit} />
            <Redirect to='/admin/configuration/admins/list' />
        </Switch>
    </Segment>
);

Admins.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Admins;
