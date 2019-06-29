// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Dropdown } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

// actions
import { getEtablissements, getUserEmail, getUser, getAdmin } from '../../../../../actions/get.action';
import { editUserEmail, editAdmin, editUserArchive, editAdminArchive } from '../../../../../actions/edit.action';
import { deleteUser, deleteAdmin } from '../../../../../actions/delete.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            tel: "",
            ville: "",
            email: "",
            etablissement: "",
            etablissements: {},
            loading: true,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        getAdmin(id).then(admin => {
            getUserEmail(id).then(email => {
                getEtablissements().then(etablissements => {
                    this.setState({
                        nom: admin.nom,
                        prenom: admin.prenom,
                        tel: admin.tel,
                        ville: admin.ville,
                        etablissement: admin.etablissement,
                        email,
                        etablissements,
                        loading: false,
                    });
                });
            });
        });
    }

    handleError() {
        let errorMessage = "";
        Object.keys(this.state).forEach(key => {
            if (key !== 'loading' && key !== 'errorMessage' && this.state[key] === undefined) {
                errorMessage = `Il faut remplir le champs : ${key}`;
            }
        });
        this.setState({ errorMessage });
        return errorMessage.length !== 0;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const error = this.handleError();
        if (!error) {
            const { id } = this.props.match.params
            editUserEmail(id, this.state.email).then(() => {
                editAdmin(id, {
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    tel: this.state.tel,
                    ville: this.state.ville,
                    etablissement: this.state.etablissement,
                }).then(() => {
                    this.setState({ loading: false });
                    this.props.history.push('/admin/configuration/admins');
                }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    toggleConfirm() {
        confirmAlert({
            title: "Archiver",
            message: "Voulez-vous vraiment archiver cette donnée ?",
            buttons: [
                { label: "Oui", onClick: this.handleArchive },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleArchive() {
        const { id } = this.props.match.params;
        this.setState({ loading: true, errorMessage: "" });
        getAdmin(id).then(admin => {
            getUser(id).then(user => {
                this.props.history.push('/admin/configuration/admins');
                editAdminArchive(id, admin).then(() => {
                    editUserArchive(id, user).then(() => {
                        deleteAdmin(id).then(() => {
                            deleteUser(id).then(() => {
                                this.setState({ loading: false });
                            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                        }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                    }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
            });
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                    <Message
                        negative
                        hidden={this.state.errorMessage.length === 0}
                        header="Erreur"
                        content={this.state.errorMessage}
                    />
                    <Form.Field>
                        <Input
                            fluid
                            label="Nom :"
                            placeholder='Nom...'
                            value={this.state.nom}
                            onChange={(_, { value }) => this.setState({ nom: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label="Prenom :"
                            placeholder='Prenom...'
                            value={this.state.prenom}
                            onChange={(_, { value }) => this.setState({ prenom: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label="Téléphone :"
                            placeholder='Téléphone...'
                            value={this.state.tel}
                            onChange={(_, { value }) => this.setState({ tel: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label="Ville :"
                            placeholder='Ville...'
                            value={this.state.ville}
                            onChange={(_, { value }) => this.setState({ ville: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label="E-mail :"
                            type='email'
                            placeholder='E-mail...'
                            value={this.state.email}
                            onChange={(_, { value }) => this.setState({ email: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><b>Etablissement :</b></label>
                        <Dropdown
                            fluid selection search
                            placeholder="Etablissement..."
                            value={this.state.etablissement}
                            onChange={(_, { value }) => this.setState({ etablissement: value })}
                            options={Object.keys(this.state.etablissements).map(key => ({
                                key, value: key,
                                text: `${this.state.etablissements[key].code} - ${this.state.etablissements[key].nom}`,
                            }))}
                        />
                    </Form.Field>
                    <Button
                        fluid positive
                        icon='edit'
                        content='Modifier'
                        onClick={this.handleSubmit}
                    />
                </Form>
                <br />
                <Button
                    fluid
                    color='orange'
                    icon='archive'
                    content='Archiver'
                    onClick={() => this.toggleConfirm()}
                />
            </div>
        );
    }
}

Edit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Edit;