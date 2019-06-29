// React
import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import ListEleves from './containers/listEleves.container';
import Eleve from './containers/eleve.container';

const Eleves = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="user"
                content="Eleves"
                subheader="Consultez les fichiers de vos élèves"
            />
        </Segment>
        <br />
        <Container>
            <Switch>
                <Route path='/moniteur/eleves/list' component={ListEleves} />
                <Route path='/moniteur/eleves/:id' component={Eleve} />
                <Redirect to='/moniteur/eleves/list' />
            </Switch>
        </Container>
    </div>
);

export default Eleves;