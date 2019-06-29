// React requirement
import React, { Component } from 'react';
import { Segment, Header, Button, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../../styles/index.style';

class PermisCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            raised: false,
        };

        this.id = "-LE6qqPZaSIX0ctjp_Ys";
    }

    render() {
        return (
            <Segment.Group
                textAlign="center"
                raised={this.state.raised}
                onMouseOver={() => this.setState({ raised: true })}
                onMouseLeave={() => this.setState({ raised: false })}
                style={Style.segmentGroup}
                onClick={() => this.props.history.push(`/home/preInscription/${this.id}`)}
            >
                <Segment inverted color="yellow" padded="very" style={Style.segmentTop}>
                    <Header as="h4" content="J'AI DÈJÀ MON CODE" />
                    <Header as="h2">
                        237,50€ <sub>x4</sub>
                        <Header.Subheader style={Style.subheader}>Soit un total de 950€</Header.Subheader>
                    </Header>
                </Segment>
                <Segment>
                    <Segment inverted color="grey" attached="top" style={Style.segmentHeader}>
                        <Header as="h4" content="À L'INSCRIPTION" />
                    </Segment>
                    <Segment attached="bottom">
                        <List divided relaxed="very" size="large">
                            <List.Item>Frais d'inscription</List.Item>
                            <List.Item><strike style={Style.strike}>La C-Box</strike></List.Item>
                        </List>
                    </Segment>
                    <Segment inverted color="grey" attached="top" style={Style.segmentHeader}>
                        <Header as="h4" content="CODE" />
                    </Segment>
                    <Segment attached="bottom">
                        <List divided relaxed="very" size="large">
                            <List.Item>
                                <strike style={Style.strike}>
                                    <b>Cours de code</b><br />
                                    en ligne en illimité
                                </strike>
                            </List.Item>
                            <List.Item>
                                <strike style={Style.strike}>Examens blancs illimités</strike>
                            </List.Item>
                            <List.Item>
                                <strike style={Style.strike}>
                                    Présentations à l’examen du code illimitées<br />
                                    <span style={Style.smallText}>(Hors timbre fiscal et redevance opérateurs privés)</span>
                                </strike>
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
                                <span>(20h de conduite en véhicule auto-école)</span>
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

PermisCode.propTypes = {
    history: PropTypes.object,
};

export default withRouter(PermisCode);