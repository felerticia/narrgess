// React requirement
import React, { Component } from 'react';
import { Segment, Header, Button, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../../styles/index.style';

class PermisConduiteAccompagneePlus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            raised: false,
        };

        this.id = "-Lc1xiWKcnJw-f6y8TDC";
    }

    render() {
        return (
            <Segment.Group
                textAlign="center"
                raised={this.state.raised}
                onMouseOver={() => this.setState({ raised: true })}
                onMouseLeave={() => this.setState({ raised: false })}
                onClick={() => this.props.history.push(`/home/preInscription/${this.id}`)}
                style={Style.segmentGroup}
            >
                <Segment inverted color="yellow" padded="very" style={Style.segmentTop}>
                    <Header as="h4" content="CONDUITE ACCOMPAGNÉE PLUS" />
                    <Header as="h2">
                        330€ <sub>x4</sub>
                        <Header.Subheader style={Style.subheader}>Soit un total de 1320€</Header.Subheader>
                    </Header>
                </Segment>
                <Segment>
                    <Segment inverted color="grey" attached="top" style={Style.segmentHeader}>
                        <Header as="h4" content="À L'INSCRIPTION" />
                    </Segment>
                    <Segment attached="bottom">
                        <List divided relaxed="very" size="large">
                            <List.Item>Pas de frais d'inscription</List.Item>
                            <List.Item>La C-Box</List.Item>
                        </List>
                    </Segment>
                    <Segment inverted color="grey" attached="top" style={Style.segmentHeader}>
                        <Header as="h4" content="CODE" />
                    </Segment>
                    <Segment attached="bottom">
                        <List divided relaxed="very" size="large">
                            <List.Item>
                                <b>Cours de code</b> en agence illimités et en ligne
                            </List.Item>
                            <List.Item>
                                <span>Examens blancs illimités</span>
                            </List.Item>
                            <List.Item>
                                Présentation à <b>l’examen du code illimitée</b><br />
                                <span style={Style.smallText}>(Hors timbre fiscal)</span>
                            </List.Item>
                        </List>
                    </Segment>
                    <Segment inverted color="grey" attached="top" style={Style.segmentHeader}>
                        <Header as="h4" content="CONDUITE" />
                    </Segment>
                    <Segment attached="bottom">
                        <List divided relaxed="very" size="large">
                            <List.Item>
                                <span>Evaluation de départ</span>
                            </List.Item>
                            <List.Item>
                                <b>20H</b><br />
                                <span>de formation pratique</span><br />
                                <span>(5h de simulateur + 17h de conduite en véhicule auto-école)</span>
                            </List.Item>
                            <List.Item>
                                <b>Rendez-vous pédagogiques</b><br />
                                <span>Rendez-vous préalable - 2h</span><br />
                                <span>1er rendez-vous pédagogique</span><br />
                                <span>1h pratique / 2h théorique</span><br />
                                <span>2nd rendez-vous pédagogique</span><br />
                                <span>1h pratique / 2h théorique</span><br />
                            </List.Item>
                            <List.Item>
                                <span>1 présentation à <b>l'examen du permis</b></span>
                            </List.Item>
                        </List>
                    </Segment>
                </Segment>
                <Button
                    fluid attached="bottom" size="big"
                    color="yellow" content="Choisir"
                    style={Style.segmentBottom}
                    onClick={() => this.props.history.push(`/home/preInscription/${this.id}`)}
                />
            </Segment.Group>
        );
    }
}

PermisConduiteAccompagneePlus.propTypes = {
    history: PropTypes.object,
};

export default withRouter(PermisConduiteAccompagneePlus);