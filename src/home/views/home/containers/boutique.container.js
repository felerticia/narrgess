// React requirement
import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../styles/boutique.style';

const Boutique = props => (
    <div style={Style.container}>
        <Grid relaxed="very">
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Card centered fluid style={Style.card}>
                    <Card.Content style={Style.cardContent}>
                        <Grid verticalAlign="middle">
                            <Grid.Row>
                                <Grid.Column computer={11} tablet={11} mobile={16}>
                                    <h1 style={Style.cardHeader}>JE PASSE MON CODE</h1>
                                    <span style={Style.cardText}>Révise tes cours de code en ligne quand tu le souhaites et où que tu sois !</span>
                                </Grid.Column>
                                <Grid.Column computer={5} tablet={5} mobile={16} style={Style.customLineHeight}>
                                    <span style={Style.cardTextOrange}>à partir de</span><br />
                                    <span style={Style.cardPrice}>50€</span><br />
                                    <Button
                                        color="orange" content="Je m'inscris"
                                        onClick={() => props.history.push("/home/forfaitsCode")}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Card centered fluid style={Style.card}>
                    <Card.Content style={Style.cardContent}>
                        <Grid verticalAlign="middle">
                            <Grid.Row>
                                <Grid.Column computer={11} tablet={11} mobile={16}>
                                    <h1 style={Style.cardHeader}>JE PASSE MON PERMIS</h1>
                                    <span style={Style.cardText}>Choisis de passer ton permis de manière classique ou directement en ligne.</span><br />
                                </Grid.Column>
                                <Grid.Column computer={5} tablet={5} mobile={16} style={Style.customLineHeight}>
                                    <span style={Style.cardTextBlue}>à partir de</span><br />
                                    <span style={Style.cardPrice}>690€</span><br />
                                    <Button
                                        color="blue" content="Je m'inscris"
                                        onClick={() => props.history.push("/home/forfaitsPermis")}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    </div>
);

Boutique.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Boutique);
