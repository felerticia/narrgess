// React
import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import Produits from './containers/produits.container';
import ProduitDetails from './containers/produitsDetails.container';

const Boutique = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="shop"
                content="E-Boutique"
                subheader="Tous les produits Conduite Center"
            />
        </Segment>
        <br />
        <Container>
            <Switch>
                <Route path='/eleve/boutique/list' component={Produits} />
                <Route path='/eleve/boutique/:id' component={ProduitDetails} />
                <Redirect to='/eleve/boutique/list' />
            </Switch>
        </Container>
    </div>
);

export default Boutique;