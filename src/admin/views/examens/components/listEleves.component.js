// React
import React, { Component } from 'react';
import { Segment, Header, Table, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
// import _ from 'lodash';

// actions
import { getExamenConvocation, getExamens, getExamen, getEleves, getMoniteurs, getMoniteursArchives, getExamenPreInscriptions } from '../../../../actions/get.action';
import { addExamenEleve } from '../../../../actions/add.action';
import { editExamenEleve, editPreInscriptionExamensArchive } from '../../../../actions/edit.action';
import { deleteExamenEleve, deletePreInscriptionExamens } from '../../../../actions/delete.action';
import { convert2pdf } from '../../../../actions/convert.action';

class ListEleves extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            examens: {},
            loadingData: true,
            eleves: {},
            loadingEleves: true,
            moniteurs: {},
            loadingMoniteurs: true,
            preInscriptions: {},
            loadingPreInscriptions: true,
            eleveToAdd: "",
            add: false,
        };

        this.addEleve = this.addEleve.bind(this);
        this.filterAddingEleves = this.filterAddingEleves.bind(this);
        this.handleChangeResultat = this.handleChangeResultat.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickPreInscription = this.handleClickPreInscription.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEleves().then(eleves => this.setState({ eleves, loadingEleves: false }));
        getExamenPreInscriptions().then(preInscriptions => this.setState({ preInscriptions, loadingPreInscriptions: false }));
        getMoniteurs().then(moniteurs => {
            getMoniteursArchives().then(archives => this.setState({ moniteurs: {...moniteurs, ...archives}, loadingMoniteurs: false }));
        });
        getExamens().then(examens => {
            const examen = examens[this.props.match.params.id] ? examens[this.props.match.params.id] : {};
            const data = examen.eleves ? examen.eleves : {};
            this.setState({ data, examens, loadingData: false });
        });
    }

    addEleve() {
        if (Object.keys(this.state.data).length < this.props.places) {
            this.setState({ loading: true });
            addExamenEleve(this.props.match.params.id, { eleve: this.state.eleveToAdd }).then(() => {
                getExamen(this.props.match.params.id).then(examen => this.setState({ data: examen.eleves ? examen.eleves : {}, loadingData: false }));
            });
        }
    }

    filterAddingEleves(eleveKey) {
        const alreadyThere = Object.values(this.state.data).find(e => e.eleve === eleveKey);
        let alreadyInAnotherExam = false;
        Object.values(this.state.examens).forEach(examen => {
            const eleves = examen.eleves ? examen.eleves : {};
            if (Object.values(eleves).find(e => e.eleve === eleveKey && (!e.result || e.result.length === 0))) alreadyInAnotherExam = true;
        });
        return !alreadyThere && !alreadyInAnotherExam;
    }

    handleChangeResultat(key, value) {
        this.setState({ loadingData: true });
        editExamenEleve(this.props.match.params.id, key, { result: value }).then(() => {
            const { preInscriptions } = this.state;
            const preInscriptionsKey = Object.keys(preInscriptions).find(k => preInscriptions[k].eleve === key);
            if (preInscriptionsKey) {
                editPreInscriptionExamensArchive(preInscriptionsKey, preInscriptions[preInscriptionsKey]).then(() => {
                    deletePreInscriptionExamens(preInscriptionsKey).then(() => {
                        getExamen(this.props.match.params.id).then(examen => this.setState({ data: examen.eleves ? examen.eleves : {}, loadingData: false }));
                    });
                });
            } else {
                getExamen(this.props.match.params.id).then(examen => this.setState({ data: examen.eleves ? examen.eleves : {}, loadingData: false }));
            }
        });
    }

    handleDownload(eleve) {
        const { id } = this.props.match.params;
        this.setState({ loadingData: true });
        getExamenConvocation(id, eleve).then(data => {
            const { html } = data;
            convert2pdf(html, "convocation.pdf");
            this.setState({ loadingData: false });
        }).catch(() => this.setState({ loadingData: false }));
    }

    toggleConfirm(eleveKey) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(eleveKey) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(eleveKey) {
        this.setState({ loadingData: true });
        deleteExamenEleve(this.props.match.params.id, eleveKey).then(() => {
            getExamen(this.props.match.params.id).then(examen => this.setState({ data: examen.eleves ? examen.eleves : {}, loadingData: false }));
        });
    }

    handleClickPreInscription(eleve) {
        if (Object.keys(this.state.data).length < this.props.places) {
            this.setState({ loading: true });
            addExamenEleve(this.props.match.params.id, { eleve }).then(() => {
                getExamen(this.props.match.params.id).then(examen => this.setState({ data: examen.eleves ? examen.eleves : {}, loadingData: false }));
            });
        }
    }

    render() {
        return (
            <Segment raised loading={this.state.loadingEleves || this.state.loadingMoniteurs || this.state.loadingData || this.state.loadingData}>
                <Header textAlign="center">Liste des élèves</Header>
                <Table singleLine striped textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Eleve</Table.HeaderCell>
                            <Table.HeaderCell>Convocation</Table.HeaderCell>
                            <Table.HeaderCell>Résultat</Table.HeaderCell>
                            <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        Object.keys(this.state.data).map(key => {
                            const eleveId = this.state.data[key].eleve ? this.state.data[key].eleve : "";
                            const resultat = this.state.data[key].result ? this.state.data[key].result : "";
                            const eleve = this.state.eleves[eleveId] ? this.state.eleves[eleveId] : {};
                            const dossier = eleve.dossier ? eleve.dossier.eleve ? eleve.dossier.eleve : {} : {};
                            return (
                                <Table.Row key={key}>
                                    <Table.Cell>{dossier.nom} {dossier.prenom}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            primary circular
                                            icon='file'
                                            onClick={() => this.handleDownload(eleveId)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Dropdown
                                            fluid selection
                                            placeholder="Résultat..."
                                            value={resultat}
                                            onChange={(_, { value }) => this.handleChangeResultat(key, value)}
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
                                            negative circular
                                            icon='trash'
                                            onClick={() => this.toggleConfirm(key)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                    </Table.Body>
                </Table>
                {/* <Button
                    circular
                    positive={Object.keys(this.state.data).length < this.props.places && !this.state.add}
                    negative={Object.keys(this.state.data).length < this.props.places && this.state.add}
                    disabled={Object.keys(this.state.data).length >= this.props.places}
                    icon={this.state.add ? 'close' : 'add'}
                    onClick={() => this.setState({ add: !this.state.add })}
                />
                <br /> */}
                {
                    // this.state.add &&
                    // <div>
                    //     <br />
                    //     <Dropdown
                    //         search
                    //         selection
                    //         placeholder='Eleve...'
                    //         options={_.filter(Object.keys(this.state.eleves), this.filterAddingEleves).map(eleveId => ({
                    //             key: eleveId,
                    //             value: eleveId,
                    //             text: `${this.state.eleves[eleveId].dossier.eleve.nom} ${this.state.eleves[eleveId].dossier.eleve.prenom}`
                    //         }))}
                    //         value={this.state.eleveToAdd}
                    //         onChange={(_, { value }) => this.setState({ eleveToAdd: value })}
                    //     />{' '}
                    //     <Button
                    //         positive
                    //         content="Ajouter"
                    //         onClick={this.addEleve}
                    //     />
                    // </div>
                }
                <Header content="Liste des élèves en pré-inscription" textAlign="center" />
                <Table singleLine striped textAlign='center'>
                    <Table.Header>
                        <Table.HeaderCell>Eleve</Table.HeaderCell>
                        <Table.HeaderCell>Moniteur</Table.HeaderCell>
                        <Table.HeaderCell>Ajouter à cet examen</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.preInscriptions &&
                        Object.values(this.state.preInscriptions).map(preInscription => (
                            <Table.Row>
                                <Table.Cell>{this.state.eleves[preInscription.eleve] ? `${this.state.eleves[preInscription.eleve].dossier.eleve.nom} ${this.state.eleves[preInscription.eleve].dossier.eleve.prenom}` : ""}</Table.Cell>
                                <Table.Cell>{this.state.moniteurs[preInscription.moniteur] ? `${this.state.moniteurs[preInscription.moniteur].nom} ${this.state.moniteurs[preInscription.moniteur].prenom}` : ""}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        circular
                                        primary={this.filterAddingEleves(preInscription.eleve) && Object.keys(this.state.data).length < this.props.places}
                                        disabled={!this.filterAddingEleves(preInscription.eleve) || Object.keys(this.state.data).length >= this.props.places}
                                        icon={!Object.values(this.state.data).find(d => d.eleve === preInscription.eleve) ? "add" : "check"}
                                        onClick={() => this.handleClickPreInscription(preInscription.eleve)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

ListEleves.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    places: PropTypes.number,
};

export default withRouter(ListEleves);
