// React
import React, { Component } from 'react';
import { Segment, Header, Button, Progress } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getElevePedagogie } from '../../../../actions/get.action';

// data
import suiviPedagogiqueData from '../../../../config/suiviPedagogique';

class Permis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedagogie: {},
            loading: true,
        };

        this.getPercConduite = this.getPercConduite.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getElevePedagogie(uid).then(pedagogie => this.setState({ pedagogie, loading: false }));
    }

    getPercConduite() {
        let points = 0;
        let maxPoints = 0;
        Object.keys(suiviPedagogiqueData).forEach(i1 => {
            const domaine = this.state.pedagogie[i1] ? this.state.pedagogie[i1] : {};
            Object.keys(suiviPedagogiqueData[i1]).forEach(i2 => {
                const competence = domaine[i2] ? domaine[i2] : {};
                const { level } = competence;
                points += level ? level : 0;
                maxPoints += 3;
            });
        });
        return parseInt(points/maxPoints*100, 10);
    }

    render() {
        return (
            <Segment raised loading={this.state.loading} color="orange">
                <Header as="h2" content="Mon Permis" textAlign="center" />
                <Segment.Group>
                    <Segment>
                        <Header content="Code" textAlign="center" color="orange" />
                    </Segment>
                    <Segment inverted color="orange" style={{ padding: '0' }}>
                        <Button.Group fluid color="orange">
                            <Button content="Réviser" onClick={() => this.props.history.push("/eleve/code")} />
                            <Button content="Examen" onClick={() => this.props.history.push("/eleve/examen")} />
                        </Button.Group>
                    </Segment>
                </Segment.Group>
                <Segment.Group>
                    <Segment>
                        <Header content="Conduite" textAlign="center" color="red" />
                        <Progress progress active percent={this.getPercConduite()} color="red" />
                    </Segment>
                    <Segment inverted color="red" style={{ padding: '0' }}>
                        <Button.Group fluid color="red">
                            <Button content="Réviser" onClick={() => this.props.history.push("/eleve/conduite")} />
                            <Button content="Examen" onClick={() => this.props.history.push("/eleve/examen")} />
                        </Button.Group>                    
                    </Segment>
                </Segment.Group>
            </Segment>
        );
    }
}

Permis.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Permis);
