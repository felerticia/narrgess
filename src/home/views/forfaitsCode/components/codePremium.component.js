// React requirement
import React, { Component } from 'react';
import { Segment, Header, Button, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../styles/index.style';

class CodePremium extends Component {
    constructor(props) {
        super(props);

        this.state = {
            raised: false,
        };

        this.id = "-LE6rdAD4q0KGQV964Zx";
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
                    <Header as="h4" content="CODE PREMIUM" />
                    <Header as="h2">
                        87€ <sub>x3</sub>
                        <Header.Subheader style={Style.subheader}>Soit un total de 261€</Header.Subheader>
                    </Header>
                </Segment>
                <Segment>
                    <Segment inverted color="grey" attached="top" style={Style.segmentHeader}>
                        <Header as="h4" content="À L'INSCRIPTION" />
                    </Segment>
                    <Segment attached="bottom">
                        <List divided relaxed="very" size="large">
                            <List.Item>Frais d'inscription</List.Item>
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
                                <b>Coaching code</b><br />
                                <span style={Style.smallText}>Cours de Code animés par un moniteur</span>
                            </List.Item>
                            <List.Item>
                                <span>Examens blancs illimités</span>
                            </List.Item>
                            <List.Item>
                                Présentation à <b>l’examen du code illimitée</b><br />
                                <span style={Style.smallText}>(Hors timbre fiscal et redevance opérateurs privés)</span>
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

CodePremium.propTypes = {
    history: PropTypes.object,
};

export default withRouter(CodePremium);