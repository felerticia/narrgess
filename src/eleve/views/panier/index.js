// React
import React from 'react';
import { Container, Grid, Segment, Header } from 'semantic-ui-react';

// Local
import Recapitulatif from './containers/recapitulatif.container';
import Paiement from './containers/paiement.container';

const Boutique = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="shopping basket"
                content="Mon panier"
                subheader="Finalise ta commande"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={8} tablet={16}>
                            <Recapitulatif />
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16}>
                            <Paiement />
                            <br />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    </div>
);

export default Boutique;