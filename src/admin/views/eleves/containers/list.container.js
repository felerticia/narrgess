// React
import React, { Component } from 'react';
import { Segment, Header, Input, Table, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import ModalAdd from '../components/modalAdd.component';

// actions
import { getEleves, getUsers } from '../../../../actions/get.action';

class ListEleves extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payload: "",
            eleves: {},
            loadingEleves: true,
            users: {},
            loadingUsers: true,
            showModal: false,
        };

        this.filterElevesPayload = this.filterElevesPayload.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEleves().then(eleves => this.setState({ eleves, loadingEleves: false }));
        getUsers().then(users => this.setState({ users, loadingUsers: false }));
    }

    filterElevesPayload(key) {
        if (this.state.payload.length < 1) {
            return true;
        } else {
            const regExp = new RegExp(_.escapeRegExp(this.state.payload), 'i');
            return (
                regExp.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.nom : "" : "") ||
                regExp.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.prenom : "" : "") ||
                regExp.test(`${this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.nom : "" : ""} ${this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.prenom : "" : ""}`) ||
                regExp.test(`${this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.prenom : "" : ""} ${this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.nom : "" : ""}`) ||
                regExp.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.tel : "" : "") ||
                regExp.test(this.state.users[key] ? this.state.users[key].email : "")
            );
        }
    }

    toggleModal(val) {
        this.setState({ showModal: val });
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loadingEleves || this.state.loadingUsers}>
                <Button
                    circular positive
                    floated='right'
                    icon='add'
                    onClick={() => this.toggleModal(true)}
                />
                <ModalAdd
                    open={this.state.showModal}
                    handleClose={() => this.toggleModal(false)}
                />
                <Header as='h2' textAlign='center'>Liste des élèves</Header>
                <Input
                    fluid
                    type='text'
                    icon='search'
                    placeholder='Rechercher...'
                    value={this.state.payload}
                    onChange={(_, { value }) => this.setState({ payload: value })}
                />
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Téléphone</Table.HeaderCell>
                            <Table.HeaderCell>E-Mail</Table.HeaderCell>
                            <Table.HeaderCell>Estimations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.eleves &&
                        Object.keys(this.state.eleves) &&
                        _.orderBy(_.filter(Object.keys(this.state.eleves), this.filterElevesPayload), key => _.filter(this.state.eleves[key].estimations ? this.state.eleves[key].estimations : {}, e => !e.viewed).length, ["desc"]).map(key => (
                            <Table.Row key={key} onClick={() => this.props.history.push(`/admin/eleves/${key}`)}>
                                <Table.Cell>{this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.nom : "" : ""}</Table.Cell>
                                <Table.Cell>{this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.prenom : "" : ""}</Table.Cell>
                                <Table.Cell>{this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve ? this.state.eleves[key].dossier.eleve.tel : "" : ""}</Table.Cell>
                                <Table.Cell>{this.state.users[key] ? this.state.users[key].email : ""}</Table.Cell>
                                <Table.Cell>
                                {
                                    _.filter(this.state.eleves[key].estimations ? this.state.eleves[key].estimations : {}, e => !e.viewed).length !== 0 &&
                                    <Label color="red">{_.filter(this.state.eleves[key].estimations ? this.state.eleves[key].estimations : {}, e => !e.viewed).length}</Label>
                                }
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
    history: PropTypes.object,
}

export default ListEleves;
