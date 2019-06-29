// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/secretaires/list.component';
import Add from '../components/secretaires/add.component';
import Edit from '../components/secretaires/edit.component';

const Secretaires = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/secretaires'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/secretaires/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Chargés de clientèle</Header>
        <Switch>
            <Route path='/admin/configuration/secretaires/list' component={List} />
            <Route path='/admin/configuration/secretaires/add' component={Add} />
            <Route path='/admin/configuration/secretaires/:id' component={Edit} />
            <Redirect to='/admin/configuration/secretaires/list' />
        </Switch>
    </Segment>
);

Secretaires.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Secretaires;
