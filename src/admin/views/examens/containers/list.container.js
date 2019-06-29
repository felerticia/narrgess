// React
import React, { Component } from 'react';
import { Segment, Header, Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getExamens, getMoniteurs, getMoniteursArchives } from '../../../../actions/get.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class ListExamens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            moniteurs: {},
            loading: true,
        };

        this.getExamenPercentageResults = this.getExamenPercentageResults.bind(this);
        this.getExamenFilled = this.getExamenFilled.bind(this);
    }

    UNSAFE_componentWillMount() {
        getMoniteurs().then(moniteurs => {
            getMoniteursArchives().then(archives => {
                getExamens().then(data => {
                    this.setState({
                        loading: false,
                        moniteurs: {...moniteurs, ...archives},
                        data,
                    });
                });
            });
        });
    }

    getExamenPercentageResults(key) {
        if (!this.state.data[key].eleves) return 0;
        const { eleves } = this.state.data[key];
        let resultsCounter = 0;
        Object.values(eleves).forEach(eleve => {
            if (eleve["result"]) resultsCounter += 1;
        });
        return 100.0*resultsCounter/Object.values(eleves).length;
    }

    getExamenFilled(key) {
        if (!this.state.data[key].eleves) return false;
        const { eleves, places } = this.state.data[key];
        return Object.values(eleves).length === places;
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loading}>
                <Button
                    circular positive
                    floated='right'
                    icon='add'
                    onClick={() => this.props.history.push("/admin/examens/add")}
                />
                <Header as='h2' textAlign='center'>Liste des examens à venir</Header>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Horaire</Table.HeaderCell>
                            <Table.HeaderCell>Places (Inscrits)</Table.HeaderCell>
                            <Table.HeaderCell>Lieux</Table.HeaderCell>
                            <Table.HeaderCell>Moniteur</Table.HeaderCell>
                            <Table.HeaderCell>Résultats enregistrés (%)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        _.orderBy(_.filter(Object.keys(this.state.data), key => new Date(this.state.data[key].start) >= new Date()), key => new Date(this.state.data[key].start).getTime(), ["asc"]).map(key => {
                            const examen = this.state.data[key];
                            const moniteur = this.state.moniteurs[examen.moniteur] ? this.state.moniteurs[examen.moniteur] : {};
                            const startDate = new Date(examen.start);
                            const endDate = new Date(examen.end);
                            const date = `${addZero(startDate.getDate())}/${addZero(startDate.getMonth()+1)}/${startDate.getFullYear()}`;
                            const start = `${addZero(startDate.getHours())}:${addZero(startDate.getMinutes())}`;
                            const end = `${addZero(endDate.getHours())}:${addZero(endDate.getMinutes())}`;
                            const nbEleves = examen.eleves ? Object.keys(examen.eleves).length : 0;
                            return (
                                <Table.Row key={key} active={startDate < new Date()} onClick={() => this.props.history.push(`/admin/examens/${key}`)}>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{examen.type}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{date}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{start} - {end}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{examen.places} ({nbEleves})</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{examen.lieux}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{moniteur.nom} {moniteur.prenom}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{this.getExamenPercentageResults(key)} %</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                    </Table.Body>
                </Table>
                <Header as='h2' textAlign='center'>Liste des examens passés</Header>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Horaire</Table.HeaderCell>
                            <Table.HeaderCell>Places (Inscrits)</Table.HeaderCell>
                            <Table.HeaderCell>Lieux</Table.HeaderCell>
                            <Table.HeaderCell>Moniteur</Table.HeaderCell>
                            <Table.HeaderCell>Résultats enregistrés (%)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        _.orderBy(_.filter(Object.keys(this.state.data), key => new Date(this.state.data[key].start) < new Date()), key => new Date(this.state.data[key].start).getTime(), ["desc"]).map(key => {
                            const examen = this.state.data[key];
                            const moniteur = this.state.moniteurs[examen.moniteur] ? this.state.moniteurs[examen.moniteur] : {};
                            const startDate = new Date(examen.start);
                            const endDate = new Date(examen.end);
                            const date = `${addZero(startDate.getDate())}/${addZero(startDate.getMonth()+1)}/${startDate.getFullYear()}`;
                            const start = `${addZero(startDate.getHours())}:${addZero(startDate.getMinutes())}`;
                            const end = `${addZero(endDate.getHours())}:${addZero(endDate.getMinutes())}`;
                            const nbEleves = examen.eleves ? Object.keys(examen.eleves).length : 0;
                            return (
                                <Table.Row key={key} active={startDate < new Date()} onClick={() => this.props.history.push(`/admin/examens/${key}`)}>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{examen.type}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{date}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{start} - {end}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{examen.places} ({nbEleves})</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{examen.lieux}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{moniteur.nom} {moniteur.prenom}</Table.Cell>
                                    <Table.Cell error={!this.getExamenFilled(key)}>{this.getExamenPercentageResults(key)} %</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

ListExamens.propTypes = {
    history: PropTypes.object,
}

export default ListExamens;
