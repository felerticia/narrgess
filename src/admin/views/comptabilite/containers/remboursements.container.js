// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListRemboursements from '../components/listRemboursements.component';

const Remboursements = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Journal des remboursements</Header>
        <Switch>
            <Route path='/admin/comptabilite/remboursements/list' component={ListRemboursements} />
            <Route path='/admin/comptabilite/remboursements/:from/:to' component={ListRemboursements} />
            <Redirect to='/admin/comptabilite/remboursements/list' />
        </Switch>
    </Segment>
);

Remboursements.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Remboursements;
