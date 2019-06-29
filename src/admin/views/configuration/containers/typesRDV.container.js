// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/typesRDV/list.component';
import Add from '../components/typesRDV/add.component';
import Edit from '../components/typesRDV/edit.component';

const TypesRDV = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/typesRDV'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/typesRDV/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Types de RDV</Header>
        <Switch>
            <Route path='/admin/configuration/typesRDV/list' component={List} />
            <Route path='/admin/configuration/typesRDV/add' component={Add} />
            <Route path='/admin/configuration/typesRDV/:id' component={Edit} />
            <Redirect to='/admin/configuration/typesRDV/list' />
        </Switch>
    </Segment>
);

TypesRDV.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default TypesRDV;
