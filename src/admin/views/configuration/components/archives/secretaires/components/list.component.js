// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader, Button, Message } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';

// actions
import { getSecretairesArchives, getSecretaireArchives, getUserArchives } from '../../../../../../../actions/get.action';
import { editSecretaire, editUser } from '../../../../../../../actions/edit.action';
import { deleteSecretaireArchive, deleteUserArchive } from '../../../../../../../actions/delete.action';

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
        getSecretairesArchives().then(data => this.setState({ data, loading: false }));
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
        getSecretaireArchives(id).then(secretaire => {
            getUserArchives(id).then(user => {
                editSecretaire(id, secretaire).then(() => {
                    editUser(id, user).then(() => {
                        deleteSecretaireArchive(id).then(() => {
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
                            <Table.HeaderCell>Ville</Table.HeaderCell>
                            <Table.HeaderCell>Téléphone</Table.HeaderCell>
                            <Table.HeaderCell>Désarchiver</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        Object.keys(this.state.data).map(key => (
                            <Table.Row key={key}>
                                <Table.Cell>{this.state.data[key].nom}</Table.Cell>
                                <Table.Cell>{this.state.data[key].prenom}</Table.Cell>
                                <Table.Cell>{this.state.data[key].ville}</Table.Cell>
                                <Table.Cell>{this.state.data[key].tel}</Table.Cell>
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
