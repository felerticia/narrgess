// React requirement
import React, { Component } from 'react';
import { Segment, Header, Button, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../styles/index.style';

class CodeCandidatLibre extends Component {
    constructor(props) {
        super(props);

        this.state = {
            raised: false,
        };

        this.id = "-Lc_SejqLXiuDFhbldsI";
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
                <Segment inverted color="orange" padded="very" style={Style.segmentTop}>
                    <Header as="h4" content="CODE CANDIDAT LIBRE" />
                    <Header as="h2" content="20€" />
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
                                <b>Cours de code</b> en ligne
                            </List.Item>
                            <List.Item>
                                <strike style={Style.strike}>
                                    <b>Coaching code</b><br />
                                    <span style={Style.smallText}>Cours de Code animés par un moniteur</span>
                                </strike>
                            </List.Item>
                            <List.Item>
                                <strike style={Style.strike}>Examens blancs illimités</strike>
                            </List.Item>
                            <List.Item>
                                <strike style={Style.strike}>
                                    Présentation à <b>l’examen du code illimitée</b><br />
                                    <span style={Style.smallText}>(Hors timbre fiscal et redevance opérateurs privés)</span>
                                </strike>
                            </List.Item>
                        </List>
                    </Segment>
                </Segment>
                <Button
                    fluid attached="bottom" size="big"
                    color="orange" content="Choisir"
                    style={Style.segmentBottom}
                    onClick={() => this.props.history.push(`/home/preInscription/${this.id}`)}
                />
            </Segment.Group>
        );
    }
}

CodeCandidatLibre.propTypes = {
    history: PropTypes.object,
};

export default withRouter(CodeCandidatLibre);