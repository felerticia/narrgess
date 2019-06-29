// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListActivitesMoniteurs from '../components/listActivitesMoniteurs.component';

const ActivitesMoniteurs = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Activites des moniteurs</Header>
        <Switch>
            <Route path='/admin/comptabilite/moniteurs/list' component={ListActivitesMoniteurs} />
            <Route path='/admin/comptabilite/moniteurs/:from/:to' component={ListActivitesMoniteurs} />
            <Redirect to='/admin/comptabilite/moniteurs/list' />
        </Switch>
    </Segment>
);

ActivitesMoniteurs.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default ActivitesMoniteurs;
