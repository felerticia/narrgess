// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader, Button, Message } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';

// actions
import { getElevesArchives, getEleveArchives, getUserArchives } from '../../../../../../../actions/get.action';
import { editEleve, editUser } from '../../../../../../../actions/edit.action';
import { deleteEleveArchive, deleteUserArchive } from '../../../../../../../actions/delete.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {},
            errorMessage: "",
        };

        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleUnarchive = this.handleUnarchive.bind(this);
    }

    UNSAFE_componentWillMount() {
        getElevesArchives().then(data => this.setState({ data, loading: false }));
    }

    toggleConfirm(key) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment désarchiver cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleUnarchive(key) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleUnarchive(id) {
        this.setState({ loading: true, errorMessage: "" });
        getEleveArchives(id).then(eleve => {
            getUserArchives(id).then(user => {
                editEleve(id, eleve).then(() => {
                    editUser(id, user).then(() => {
                        deleteEleveArchive(id).then(() => {
                            deleteUserArchive(id).then(() => {
                                this.setState({ loading: false });
                            }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
                        }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
                    }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
                }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
            }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
        }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.loading}><Loader /></Dimmer>
                <Message
                    negative
                    hidden={this.state.errorMessage.length === 0}
                    icon='warning'
                    header="Erreur"
                    content={this.state.errorMessage}
                />
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Adresse</Table.HeaderCell>
                            <Table.HeaderCell>Désarchiver</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        Object.keys(this.state.data).map(key => (
                            <Table.Row key={key}>
                                <Table.Cell>{this.state.data[key].dossier ? this.state.data[key].dossier.eleve ? this.state.data[key].dossier.eleve.nom : '' : ''}</Table.Cell>
                                <Table.Cell>{this.state.data[key].dossier ? this.state.data[key].dossier.eleve ? this.state.data[key].dossier.eleve.prenom : '' : ''}</Table.Cell>
                                <Table.Cell>{this.state.data[key].dossier ? this.state.data[key].dossier.eleve ? this.state.data[key].dossier.eleve.adresse : '' : ''}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        circular
                                        icon='undo'
                                        color='orange'
                                        onClick={() => this.toggleConfirm(key)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default List;
