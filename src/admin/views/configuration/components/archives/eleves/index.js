// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import List from './components/list.component';

const Eleves = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='close'
            attached='top left'
            onClick={() => props.history.push('/admin/configuration/archives')}
        />
        <Header as='h2' textAlign='center'>Eleves archivés</Header>
        <Switch>
            <Route path='/admin/configuration/archives/eleves/list' component={List} />
            <Redirect to='/admin/configuration/archives/eleves/list' />
        </Switch>
    </Segment>
);

Eleves.propTypes = {
    history: PropTypes.object,
};

export default Eleves;
