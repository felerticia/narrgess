// React
import React, { Component } from 'react';
import { Table, Segment, Button, Dropdown } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';

// actions
import { getUserLevel, getLieuxRDV, getMoniteurs, getMoniteursArchives, getTypesRDV, getElevePlanningElement, getEleveAbsencesElement } from '../../../../../actions/get.action';
import { editElevePlanningElement, editEleveAbsencesElement } from '../../../../../actions/edit.action';
import { getLoggedUser } from '../../../../../actions/auth.action';
import { deleteElevePlanning, deleteEleveAbsences, deletePlanning } from '../../../../../actions/delete.action';

const addZero = nb => nb < 10 ? `0${nb}` : `${nb}`

const dateToDMY = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${addZero(day)}/${addZero(month)}/${year}`;
};

const dateToHourStart = date => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${addZero(hour)}:${addZero(minutes)}`;
};

const dateToHourEnd = date => {
    const hour = date.getHours()+1;
    const minutes = date.getMinutes();
    return `${addZero(hour)}:${addZero(minutes)}`;
};

class Planning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userLevel: 0,
            loadingUserLevel: true,
            lieuxRDV: {},
            loadingLieux: true,
            moniteurs: {},
            loadingMoniteurs: true,
            typesRDV: {},
            loadingTypesRDV: true,
        };

        this.getAbsencesOptions = this.getAbsencesOptions.bind(this);
        this.handleChangeAbsence = this.handleChangeAbsence.bind(this);
        this.toggleConfirmDelete = this.toggleConfirmDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getUserLevel(uid).then(userLevel => this.setState({ userLevel, loadingUserLevel: false }));
        getLieuxRDV().then(lieuxRDV => this.setState({ lieuxRDV, loadingLieux: false }));
        getTypesRDV().then(typesRDV => this.setState({ typesRDV, loadingTypesRDV: false }));
        getMoniteurs().then(moniteurs => {
            getMoniteursArchives().then(archives => {
                this.setState({
                    moniteurs: {...moniteurs, ...archives},
                    loadingMoniteurs: false,
                });
            });
        });
    }

    getAbsencesOptions() {
        const options = [
            { key: "P", value: "P", text: "Elève présent" },
            { key: "D", value: "D", text: "Due" },
        ];
        if (this.state.userLevel >= 1000) options.push({ key: "E", value: "E", text: "Excusée" });
        return options;
    }

    handleChangeAbsence(type, key, value, old_value) {
        this.setState({ loading: true });
        if (value !== old_value) {
            if (type === "past") {
                editElevePlanningElement(this.props.match.params.id, key, { absence: value }).then(() => {
                    if (value === "D" || value === "E") {
                        getElevePlanningElement(this.props.match.params.id, key).then(planningElement => {
                            editEleveAbsencesElement(this.props.match.params.id, key, planningElement).then(() => {
                                this.setState({ loading: false });
                            });
                        });
                    }
                });
            } else if (type === "future") {
                if (old_value === "P") {
                    editElevePlanningElement(this.props.match.params.id, key, { absence: value }).then(() => {
                        getElevePlanningElement(this.props.match.params.id, key).then(planningElement => {
                            editEleveAbsencesElement(this.props.match.params.id, key, planningElement).then(() => {
                                deleteElevePlanning(this.props.match.params.id, key).then(() => {
                                    this.setState({ loading: false });
                                });
                            });
                        });
                    });
                } else {
                    if (value === "P") {
                        editEleveAbsencesElement(this.props.match.params.id, key, { absence: value }).then(() => {
                            getEleveAbsencesElement(this.props.match.params.id, key).then(absencesElement => {
                                editElevePlanningElement(this.props.match.params.id, key, absencesElement).then(() => {
                                    deleteEleveAbsences(this.props.match.params.id, key).then(() => {
                                        this.setState({ loading: false });
                                    });
                                });
                            });
                        });
                    } else {
                        editEleveAbsencesElement(this.props.match.params.id, key, { absence: value }).then(() => {
                            this.setState({ loading: false });
                        });
                    }
                }
            }
        }
    }

    toggleConfirmDelete(id) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(id) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(id) {
        this.setState({ loadingLieux: true });
        deletePlanning(this.props.match.params.id, id).then(() => {
            this.setState({ loadingLieux: false });
            this.props.fetchData();
        }).catch(() => this.setState({ loadingLieux: false }));
    }

    render() {
        const loading = this.state.loadingUserLevel || this.state.loadingLieux || this.state.loadingMoniteurs || this.state.loadingTypesRDV;
        const planning = {};
        Object.keys(this.props.absences).forEach(key => planning[key] = this.props.absences[key]);
        Object.keys(this.props.data).forEach(key => planning[key] = this.props.data[key]);
        return (
            <Segment basic loading={loading}>
                <Table textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Type de RDV</Table.HeaderCell>
                            <Table.HeaderCell>Horaire</Table.HeaderCell>
                            <Table.HeaderCell>Moniteur</Table.HeaderCell>
                            <Table.HeaderCell>Lieux de RDV</Table.HeaderCell>
                            <Table.HeaderCell>Absence</Table.HeaderCell>
                            <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        Object.keys(planning) &&
                        _.sortBy(Object.keys(planning), key => -1*(new Date(planning[key].date).getTime())).map(key => {
                            const date = new Date(planning[key].date);
                            const DMY = dateToDMY(date);
                            const hourStart = dateToHourStart(date);
                            const hourEnd = dateToHourEnd(date);
                            const moniteur = this.state.loadingMoniteurs ? {} : this.state.moniteurs[planning[key].moniteur] ? this.state.moniteurs[planning[key].moniteur] : {};
                            const lieuxRDV = this.state.loadingLieux ? {} : this.state.lieuxRDV[planning[key].lieuxRDV] ? this.state.lieuxRDV[planning[key].lieuxRDV] : {};
                            const typeRDV = this.state.loadingTypesRDV ? {} : this.state.typesRDV[planning[key].typeRDV] ? this.state.typesRDV[planning[key].typeRDV] : {};
                            const absence = planning[key].absence ? planning[key].absence : "P";
                            return (
                                <Table.Row key={key} active={date < new Date()}>
                                    <Table.Cell>{DMY}</Table.Cell>
                                    <Table.Cell>{typeRDV.nom}</Table.Cell>
                                    <Table.Cell>{hourStart} - {hourEnd}</Table.Cell>
                                    <Table.Cell>{moniteur ? `${moniteur.nom} ${moniteur.prenom}` : "-"}</Table.Cell>
                                    <Table.Cell>{lieuxRDV ? `${lieuxRDV.nom}` : "-"}</Table.Cell>
                                    <Table.Cell>
                                    {
                                        date.getTime() > new Date().getTime() + 48*60*60*1000 ? "/" :
                                        date.getTime() > new Date().getTime() ? 
                                        <Dropdown
                                            value={absence}
                                            onChange={(_, { value }) => this.handleChangeAbsence("future", key, value, absence)}
                                            options={this.getAbsencesOptions()}
                                        /> :
                                        <Dropdown
                                            value={absence}
                                            onChange={(_, { value }) => this.handleChangeAbsence("past", key, value, absence)}
                                            options={this.getAbsencesOptions()}
                                        />
                                    } 
                                    </Table.Cell>
                                    <Table.Cell>
                                    {
                                        (this.state.userLevel >= 1000 || date >= new Date()) &&
                                        <Button
                                            negative
                                            circular
                                            icon='trash'
                                            onClick={() => this.toggleConfirmDelete(key)}
                                        />
                                    }
                                    </Table.Cell>
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

Planning.propTypes = {
    data: PropTypes.object,
    fetchData: PropTypes.func,
    absences: PropTypes.object,
    match: PropTypes.object,
};

export default withRouter(Planning);