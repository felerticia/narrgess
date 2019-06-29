// React
import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

// Local
import ListExamens from './containers/listExamens.container';

const Examen = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="student"
                content="Examen"
                subheader="Mes résultats et examens à venir"
            />
        </Segment>
        <br />
        <Container>
            <ListExamens />
        </Container>
    </div>
);

export default Examen;