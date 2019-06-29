// React
import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import ListImpayes from '../components/listImpayes.component';

const Impayes = props => (
    <Segment raised padded>
        <Label
            as='a'
            size='large'
            icon='arrow left'
            attached='top left'
            onClick={() => props.history.push('/admin/comptabilite')}
        />
        <Header as='h2' textAlign='center'>Journal des impayés</Header>
        <Switch>
            <Route path='/admin/comptabilite/impayes/list' component={ListImpayes} />
            <Route path='/admin/comptabilite/impayes/:from/:to' component={ListImpayes} />
            <Redirect to='/admin/comptabilite/impayes/list' />
        </Switch>
    </Segment>
);

Impayes.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Impayes;
