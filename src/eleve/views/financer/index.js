// React
import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

// Local
import Montant from './containers/montant.container';

const Financer = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="money bill alternate outline"
                content="Financer mon permis"
                subheader="Je complète le financement de mon permis"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <Montant />
            </Segment>
        </Container>
    </div>
);

export default Financer;