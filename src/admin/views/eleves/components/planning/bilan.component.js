// React
import React, { Component } from 'react';
import { Table, Segment, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getUserLevel, getTypesRDV, getEleveNbHours, getEleveCompte } from '../../../../../actions/get.action';
import { getLoggedUser } from '../../../../../actions/auth.action';
import { editElevePenalty } from '../../../../../actions/edit.action';

const counterBilan = data => {
    let passees = 0;
    let prevues = 0;
    Object.values(data).forEach(heure => {
        const date = new Date(heure.date);
        if (heure.absence !== "E") {
            if (date < new Date()) passees += 1;
            else prevues += 1;
        }
    });
    return {
        passees,
        prevues,
        total: passees+prevues,
    };
};

const total = values => {
    let sum = 0;
    Object.values(values).forEach(val => sum += val);
    return sum;
};

class Bilan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userLevel: 0,
            typesRDV: {},
            penalty: {},
            loadingUserLevel: true,
            loadingTypesRDV: true,
            loadingPenalty: true,
        };

        this.handleChangePenalty = this.handleChangePenalty.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getUserLevel(uid).then(userLevel => this.setState({ userLevel, loadingUserLevel: false }));
        this.fetchData();
    }

    fetchData() {
        this.setState({ loadingPenalty: true, loadingTypesRDV: true, })
        getEleveCompte(this.props.match.params.id).then(compte => this.setState({ penalty: compte.penalty ? compte.penalty : {}, loadingPenalty: false }));
        getTypesRDV().then(typesRDV => {
            Object.keys(typesRDV).forEach(key => {
                getEleveNbHours(this.props.match.params.id, key).then(({ nbHeures }) => {
                    typesRDV[key].nbHeures = nbHeures;
                    this.setState({ typesRDV });
                });
            });
            this.setState({ typesRDV, loadingTypesRDV: false });
        });
    }

    handleChangePenalty(penalty, type) {
        const value = parseInt(penalty, 10) ? parseInt(penalty, 10) : 0;
        const payloads = {}; payloads[type] = value;
        this.setState({ penalty: payloads });
        editElevePenalty(this.props.match.params.id, payloads).then(() => {
            this.fetchData();
        });
    }

    render() {
        const planning = {};
        Object.keys(this.props.absences).forEach(key => planning[key] = this.props.absences[key]);
        Object.keys(this.props.data).forEach(key => planning[key] = this.props.data[key]);
        const bilan = counterBilan(planning);
        return (
            <Segment basic loading={this.state.loadingUserLevel || this.state.loadingTypesRDV || this.state.loadingPenalty}>
                {
                    this.state.userLevel > 0 &&
                    Object.keys(this.state.typesRDV).map(key => (
                        <Input
                            fluid min={0} key={key} type="number"
                            label={`${this.state.typesRDV[key].nom} déjà réalisé(s) :`}
                            value={this.state.penalty[key]}
                            onChange={(_, { value }) => this.handleChangePenalty(value, key)}
                        />
                    ))
                }
                <Table celled structured textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={2}>Compte des heures</Table.HeaderCell>
                            <Table.HeaderCell rowSpan={2}>Heures placées</Table.HeaderCell>
                            <Table.HeaderCell colSpan={Object.keys(this.state.typesRDV).length}>Heures restantes</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Passées</Table.HeaderCell>
                            <Table.HeaderCell>Prévues</Table.HeaderCell>
                            {
                                Object.values(this.state.typesRDV).map((typeRDV, index) => (
                                    <Table.HeaderCell key={index}>{typeRDV.nom}</Table.HeaderCell>
                                ))
                            }
                        </Table.Row>
                    </Table.Header>
                    {
                        this.props.data &&
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{bilan.passees}{` + ${total(this.state.penalty)}`}</Table.Cell>
                                <Table.Cell>{bilan.prevues}</Table.Cell>
                                <Table.Cell>{bilan.total+total(this.state.penalty)}</Table.Cell>
                                {
                                    Object.values(this.state.typesRDV).map((typeRDV, index) => (
                                        <Table.HeaderCell key={index}>{typeRDV.nbHeures}</Table.HeaderCell>
                                    ))
                                }
                            </Table.Row>
                        </Table.Body>
                    }
                </Table>
            </Segment>  
        );
    }
}

Bilan.propTypes = {
    data: PropTypes.object,
    absences: PropTypes.object,
    match: PropTypes.object,
};

export default withRouter(Bilan);