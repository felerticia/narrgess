// React
import React from 'react';
import { Segment, Header, Container, Grid } from 'semantic-ui-react';

// Local
import CoordEleve from './containers/coordEleve.container';
import CoordRepresentant from './containers/coordRepresentant.container';
import Pieces from './containers/pieces.container';

const Dossier = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="folder outline"
                content="Mon dossier"
                subheader="Je renseigne mes coordonnées"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column computer={8} tablet={16}>
                            <CoordEleve />
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16}>
                            <CoordRepresentant />
                            <Pieces />
                            <br />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    </div >
);

export default Dossier;