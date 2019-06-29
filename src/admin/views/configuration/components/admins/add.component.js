// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getEtablissements } from '../../../../../actions/get.action';
import { createUser } from '../../../../../actions/add.action';
import { editUser, editAdmin } from '../../../../../actions/edit.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            email: "",
            tel: "",
            ville: "",
            password: "",
            etablissement: "",
            etablissements: {},
            loading: true,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEtablissements().then(etablissements => this.setState({ etablissements, loading: false }));
    }

    handleError() {
        let errorMessage = "";
        Object.keys(this.state).forEach(key => {
            if (key !== 'loading' && key !== 'errorMessage' && (this.state[key] === undefined || this.state[key].length === 0)) {
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
            createUser(this.state.email, this.state.password).then(user => {
                editUser(user.uid, {
                    type: "admin",
                    email: this.state.email,
                    level: 1000,
                }).then(() => {
                    editAdmin(user.uid, {
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
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                <Message
                    negative
                    header="Erreur"
                    hidden={this.state.errorMessage.length === 0}
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
                    <Input
                        fluid
                        label="Mot de passe :"
                        placeholder='Password...'
                        value={this.state.password}
                        onChange={(_, { value }) => this.setState({ password: value })}
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
                    fluid
                    positive
                    content='Ajouter'
                    onClick={this.handleSubmit}
                />
            </Form>
        );
    }
}

Add.propTypes = {
    history: PropTypes.object,
};

export default Add;