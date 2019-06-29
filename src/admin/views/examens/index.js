// React
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import List from './containers/list.container';
import Add from './containers/add.container';
import Examen from './containers/examen.container';

const Examens = () => (
    <Container>
        <Switch>
            <Route path='/admin/examens/list' component={List} />
            <Route path='/admin/examens/add' component={Add} />
            <Route path='/admin/examens/:id' component={Examen} />
            <Redirect to='/admin/examens/list' />
        </Switch>
    </Container>
);

export default Examens;
