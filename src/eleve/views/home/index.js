// React
import React from 'react';
import { Segment, Header, Container, Grid, Button } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';

// Local
import Permis from './containers/permis.container';
import YoutubeVideos from './containers/youtubeVideos.container';

const Home = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="th"
                content="Tableau de bord"
                subheader="Situation générale de mon compte"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                            <Permis />
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                            <YoutubeVideos />
                            <br />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Button 
                circular primary
                className="fabButton"
                size="massive"
                icon="bell"
                onClick={() => {
                    confirmAlert({
                        title: "Besoin d'aide ?",
                        message: (
                            <div>
                                <Header as="h5" color="orange" icon="phone" content="TELEPHONE" />
                                Tu peux nous contacter au 04 81 91 96 80
                                <Header as="h5" color="orange" icon="mail" content="E-MAIL" />
                                Ecris nous par mail à l'adresse qualite@conduitecenter.fr
                            </div>
                        ),
                        buttons: [
                            { label: "Ok", onClick: null },
                        ],
                    });
                }}
            />
        </Container>
    </div>
);

export default Home;