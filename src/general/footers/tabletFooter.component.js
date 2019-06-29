// React requirement
import React from 'react';
import { Segment, Container, List, Header, Divider, Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const TabletFooter = props => (
    <Segment inverted vertical style={{ padding: "5em 0" }}>
        <Container textAlign="center">
            <Header as="h5" inverted color="grey" textAlign="center">
                Cours &nbsp;●&nbsp;
                Code &nbsp;●&nbsp;
                Conduite &nbsp;●&nbsp;
                Pédagogie &nbsp;●&nbsp;
                Examen &nbsp;●&nbsp;
                Accompagnement
            </Header>
            <Divider />
            <Grid divided="vertically" inverted verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={16} textAlign="center">
                        <List inverted link relaxed>
                            <List.Item
                                as="a" href="#" content="ACCUEIL"
                                onClick={() => props.history.push("/home/home")}
                            />
                            <List.Item
                                as="a" href="#" content="CODE DE LA ROUTE"
                                onClick={() => props.history.push("/home/forfaitsCode")}
                            />
                            <List.Item
                                as="a" href="#" content="PERMIS DE CONDUIRE"
                                onClick={() => props.history.push("/home/forfaitsPermis")}
                            />
                            <List.Item
                                as="a" href="#" content="NOS AGENCES"
                                onClick={() => props.history.push("/home/team")}
                            />
                        </List>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16} textAlign="center">
                        <List horizontal inverted link relaxed size="massive">
                            <List.Item
                                as="a" href="#" icon="facebook"
                                onClick={() => window.open("https://www.facebook.com/conduitecenter/", "_blank")}
                            />
                            <List.Item
                                as="a" href="#" icon="instagram"
                                onClick={() => window.open("https://www.instagram.com/conduite.center/?hl=fr", "_blank")}
                            />
                            <List.Item
                                as="a" href="#" icon="youtube"
                                onClick={() => window.open("https://www.youtube.com/user/ConduiteCenter", "_blank")}
                            />
                        </List>
                        <p><b>
                            Contactez-nous du lundi au vendredi<br />
                            de 10h à 12h et de 14h à 19h<br />
                            <h3 style={{ color: "#ea6814" }}>04.81.91.96.83</h3>    
                        </b></p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
            <Image
                centered size="mini" bordered={false}
                src="/img/favicon.png"
                onClick={() => props.history.push("/")}
            />
            <List inverted link size="small">
                <List.Item as="a" href="#" onClick={() => props.history.push("/privacyPolicy")}>
                    Mentions Légales
                </List.Item>
                <List.Item>
                    Copyright 2019 ConduiteCenter. Tous droits réservés.
                </List.Item>
            </List>
        </Container>
    </Segment>
);

TabletFooter.propTypes = {
    history: PropTypes.object,
};

export default withRouter(TabletFooter);