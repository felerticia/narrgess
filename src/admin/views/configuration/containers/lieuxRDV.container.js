// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/lieuxRDV/list.component';
import Add from '../components/lieuxRDV/add.component';
import Edit from '../components/lieuxRDV/edit.component';

const LieuxRDV = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/lieuxRDV'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/lieuxRDV/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Lieux de RDV</Header>
        <Switch>
            <Route path='/admin/configuration/lieuxRDV/list' component={List} />
            <Route path='/admin/configuration/lieuxRDV/add' component={Add} />
            <Route path='/admin/configuration/lieuxRDV/:id' component={Edit} />
            <Redirect to='/admin/configuration/lieuxRDV/list' />
        </Switch>
    </Segment>
);

LieuxRDV.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default LieuxRDV;
