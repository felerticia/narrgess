// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListActivitesEleves from '../components/listActivitesEleves.component';

const ActivitesEleves = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Activites des élèves</Header>
        <Switch>
            <Route path='/admin/comptabilite/eleves/list' component={ListActivitesEleves} />
            <Redirect to='/admin/comptabilite/eleves/list' />
        </Switch>
    </Segment>
);

ActivitesEleves.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default ActivitesEleves;
