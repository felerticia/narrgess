// React
import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import Home from './containers/home.container';
import Pedagogie from './containers/pedagogie.container';
import Reserver from './containers/reserver.container';

const Conduite = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="car"
                content="Conduite"
                subheader="Je réserve mes heures de conduite et je suis ma progression"
            />
        </Segment>
        <br />
        <Container>
            <Switch>
                <Route path='/eleve/conduite/home' component={Home} />
                <Route path='/eleve/conduite/pedagogie' component={Pedagogie} />
                <Route path='/eleve/conduite/reserver' component={Reserver} />
                <Redirect to='/eleve/conduite/home' />
            </Switch>
        </Container>
    </div>
);

export default Conduite;