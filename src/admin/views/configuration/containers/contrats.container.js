// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/contrats/list.component';
import Add from '../components/contrats/add.component';
import Edit from '../components/contrats/edit.component';

const Contrats = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/contrats'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/contrats/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Contrats</Header>
        <Switch>
            <Route path='/admin/configuration/contrats/list' component={List} />
            <Route path='/admin/configuration/contrats/add' component={Add} />
            <Route path='/admin/configuration/contrats/:id' component={Edit} />
            <Redirect to='/admin/configuration/contrats/list' />
        </Switch>
    </Segment>
);

Contrats.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Contrats;
