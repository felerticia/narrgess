// React
import React, { Component } from 'react';
import { Table, Button, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getExamenEleves } from '../../../../../actions/get.action';
import { editExamenEleve } from '../../../../../actions/edit.action';
import { deleteElevePastExams, deleteExamenEleve } from '../../../../../actions/delete.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class List extends Component {
    constructor(props) {
        super(props);

        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleChangeResultat = this.handleChangeResultat.bind(this);
        this.handleDeleteNext = this.handleDeleteNext.bind(this);
        this.handleDeletePast = this.handleDeletePast.bind(this);
    }

    toggleConfirm(key, func) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => func(key) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleChangeResultat(keyExamen, keyExamenEleve, value) {
        this.setState({ loadingData: true });
        editExamenEleve(keyExamen, keyExamenEleve, { result: value }).then(() => {
            this.props.fetchData();
        });
    }

    handleDeleteNext(key) {
        getExamenEleves(key).then(eleves => {
            Object.keys(eleves).forEach(eleveKey => {
                if (eleves[eleveKey].eleve === this.props.match.params.id) {
                    deleteExamenEleve(key, eleveKey).then(() => {
                        this.props.fetchData();
                    });
                }
            });
        });
    }

    handleDeletePast(key) {
        deleteElevePastExams(this.props.match.params.id, key).then(() => {
            this.props.fetchData();
        });
    }

    render() {
        const eleveId = this.props.match.params.id;
        return (
            <Table striped textAlign='center'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Horaire</Table.HeaderCell>
                        <Table.HeaderCell>Lieux</Table.HeaderCell>
                        <Table.HeaderCell>Résultat</Table.HeaderCell>
                        <Table.HeaderCell>Supprimer</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    this.props.dataNext &&
                    _.orderBy(Object.keys(this.props.dataNext), key => new Date(this.props.dataNext[key].start).getTime(), ["desc"]).map(key => {
                        const examen = this.props.dataNext[key];
                        const startDate = new Date(examen.start);
                        const endDate = new Date(examen.end);
                        const date = `${addZero(startDate.getDate())}/${addZero(startDate.getMonth()+1)}/${startDate.getFullYear()}`;
                        const start = `${addZero(startDate.getHours())}:${addZero(startDate.getMinutes())}`;
                        const end = `${addZero(endDate.getHours())}:${addZero(endDate.getMinutes())}`;
                        const keyExamenEleve = Object.keys(examen.eleves).find(k => examen.eleves[k].eleve === eleveId);
                        const eleve = examen.eleves[keyExamenEleve];
                        return (
                            <Table.Row key={key}>
                                <Table.Cell>{examen.type}</Table.Cell>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{start} - {end}</Table.Cell>
                                <Table.Cell>{examen.lieux}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        fluid selection
                                        placeholder="Résultat..."
                                        value={eleve.result && eleve.result !== "" ? eleve.result : ""}
                                        onChange={(_, { value }) => this.handleChangeResultat(key, keyExamenEleve, value)}
                                        options={[
                                            { key: "0", value: "", text: "Non réalisé" },
                                            { key: "Obtenu", value: "Obtenu", text: "Obtenu" },
                                            { key: "Ajourné", value: "Ajourné", text: "Ajourné" },
                                            { key: "Annulé", value: "Annulé", text: "Annulé" },
                                        ]}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        circular negative
                                        icon="trash"
                                        onClick={() => this.toggleConfirm(key, this.handleDeleteNext)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })
                }
                {
                    this.props.dataPast &&
                    _.orderBy(Object.keys(this.props.dataPast), key => new Date(this.props.dataPast[key].start).getTime(), ["desc"]).map(key => {
                        const examen = this.props.dataPast[key];
                        const startDate = new Date(examen.start);
                        const endDate = new Date(examen.end);
                        const date = `${addZero(startDate.getDate())}/${addZero(startDate.getMonth()+1)}/${startDate.getFullYear()}`;
                        const start = `${addZero(startDate.getHours())}:${addZero(startDate.getMinutes())}`;
                        const end = `${addZero(endDate.getHours())}:${addZero(endDate.getMinutes())}`;
                        const resultat = examen.resultat;
                        return (
                            <Table.Row key={key}>
                                <Table.Cell>{examen.type}</Table.Cell>
                                <Table.Cell>{date}</Table.Cell>
                                <Table.Cell>{start} - {end}</Table.Cell>
                                <Table.Cell>{examen.lieux}</Table.Cell>
                                <Table.Cell>{resultat}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        circular negative
                                        icon="trash"
                                        onClick={() => this.toggleConfirm(key, this.handleDeletePast)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })
                }
                </Table.Body>
            </Table>
        );
    }
}

List.propTypes = {
    dataPast: PropTypes.object,
    dataNext: PropTypes.object,
    fetchData: PropTypes.func,
    match: PropTypes.object,
};

export default withRouter(List);