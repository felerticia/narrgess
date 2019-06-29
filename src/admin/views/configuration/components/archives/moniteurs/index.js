// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from './components/list.component';

const Moniteurs = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='close'
            attached='top left'
            onClick={() => props.history.push('/admin/configuration/archives')}
        />
        <Header as='h2' textAlign='center'>Moniteurs archivés</Header>
        <Switch>
            <Route path='/admin/configuration/archives/moniteurs/list' component={List} />
            <Redirect to='/admin/configuration/archives/moniteurs/list' />
        </Switch>
    </Segment>
);

Moniteurs.propTypes = {
    history: PropTypes.object,
};

export default Moniteurs;
