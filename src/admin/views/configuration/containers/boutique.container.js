// React
import React from 'react';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from '../components/boutique/list.component';
import Add from '../components/boutique/add.component';
import Edit from '../components/boutique/edit.component';

const Boutique = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push(`/admin/configuration${props.location.pathname.split('/')[4] === 'list' ? '' : '/boutique'}`)}
        />
        <Button
            circular
            floated='right'
            positive={props.location.pathname.split('/')[4] === 'list'}
            negative={props.location.pathname.split('/')[4] !== 'list'}
            icon={props.location.pathname.split('/')[4] === 'list' ? 'add' : 'close'}
            onClick={() => props.history.push(`/admin/configuration/boutique/${props.location.pathname.split('/')[4] === 'list' ? 'add' : 'list'}`)}
        />
        <Header as='h2' textAlign='center'>Boutique</Header>
        <Switch>
            <Route path='/admin/configuration/boutique/list' component={List} />
            <Route path='/admin/configuration/boutique/add' component={Add} />
            <Route path='/admin/configuration/boutique/:id' component={Edit} />
            <Redirect to='/admin/configuration/boutique/list' />
        </Switch>
    </Segment>
);

Boutique.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Boutique;
