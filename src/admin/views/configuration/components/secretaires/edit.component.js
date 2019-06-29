// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Dropdown, Icon, Popup } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

// Local
import PopupContent from './popupContent.component';

// actions
import { getEtablissements, getUser, getSecretaire } from '../../../../../actions/get.action';
import { editUser, editUserEmail, editSecretaire, editUserArchive, editSecretaireArchive } from '../../../../../actions/edit.action';
import { deleteUser, deleteSecretaire } from '../../../../../actions/delete.action';

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
            level: 0,
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
        getSecretaire(id).then(secretaire => {
            getUser(id).then(user => {
                getEtablissements().then(etablissements => {
                    this.setState({
                        nom: secretaire.nom,
                        prenom: secretaire.prenom,
                        tel: secretaire.tel,
                        ville: secretaire.ville,
                        email: user.email,
                        level: user.level,
                        etablissement: secretaire.etablissement,
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
        if (e) e.preventDefault();
        this.setState({ loading: true });
        const error = this.handleError();
        if (!error) {
            const { id } = this.props.match.params;
            editUserEmail(id, this.state.email).then(() => {
                editUser(id, { level: this.state.level }).then(() => {
                    editSecretaire(id, {
                        nom: this.state.nom,
                        prenom: this.state.prenom,
                        tel: this.state.tel,
                        ville: this.state.ville,
                        etablissement: this.state.etablissement,
                    }).then(() => {
                        this.setState({ loading: false });
                        this.props.history.push('/admin/configuration/secretaires');
                    }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    toggleConfirm() {
        confirmAlert({
            title: "Archiver",
            message: `Voulez-vous vraiment archiver cette donnée ?`,
            buttons: [
                { label: "Oui", onClick: this.handleArchive },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleArchive() {
        const { id } = this.props.match.params;
        this.setState({ loading: true, errorMessage: "" });
        getSecretaire(id).then(secretaire => {
            getUser(id).then(user => {
                this.props.history.push('/admin/configuration/secretaires');
                editSecretaireArchive(id, secretaire).then(() => {
                    editUserArchive(id, user).then(() => {
                        deleteSecretaire(id).then(() => {
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
                        <label>
                            Niveau d'autorisation :
                            <Popup
                                wide='very'
                                trigger={<Icon name="info circle" />}
                                content={<PopupContent />}
                            />
                        </label>
                        <Dropdown
                            fluid selection
                            value={this.state.level}
                            onChange={(_, { value }) => this.setState({ level: value })}
                            options={[
                                { key: 0, value: 0, text: "Niveau: 0 - Chargé" },
                                { key: 1, value: 1, text: "Niveau: 1 - Comptable" },
                            ]}
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