// React
import React, { Component } from 'react';
import { Segment, Input, Header, Divider, Button, Message, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

// actions
import { createUser } from '../../../../actions/add.action';
import { editUser, editEleve } from '../../../../actions/edit.action';

class ModalAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorMsg: "",
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.nom.length === 0) this.setState({ errorMsg: "Il faut remplir le champs Nom" });
        else if (this.state.prenom.length === 0) this.setState({ errorMsg: "Il faut remplir le champs Prénom" });
        else if (this.state.password !== this.state.confirmPassword) this.setState({ errorMsg: "Les deux mots de passes ne sont pas les mêmes" });
        else if (this.state.password.length < 8) this.setState({ errorMsg: "Le mot de passe doit être de longueur 8 minimum" })
        else {
            this.setState({ loading: true });
            createUser(this.state.email, this.state.password).then(user => {
                editUser(user.uid, {
                    type: "eleve",
                    email: this.state.email,
                    level: -1,
                }).then(() => {
                    editEleve(user.uid, {
                        dossier: { eleve: {
                            nom: this.state.nom,
                            prenom: this.state.prenom,
                        }},
                    }).then(() => {
                        this.setState({ loading: false });
                        this.props.history.push(`/admin/eleves/${user.uid}`);
                    }).catch(err => this.setState({ errorMsg: err.message, loading: false }));
                }).catch(err => this.setState({ errorMsg: err.message, loading: false }));
            }).catch(err => this.setState({ errorMsg: err.message, loading: false }));
        }
    }

    render() {
        return (
            <Modal
                center
                showCloseIcon={false}
                open={this.props.open}
                onClose={this.props.handleClose}
                styles={{ modal: {minWidth: '60%'} }}
            >
                <Segment raised>
                    <Button
                        circular negative
                        floated='right'
                        icon='close'
                        onClick={this.props.handleClose}
                    />
                    <Header
                        as="h2"
                        textAlign="center"
                        content="Ajouter un élève"    
                    />
                    <Divider />
                    <Message
                        warning
                        icon="warning"
                        header="Erreur"
                        content={this.state.errorMsg}
                        hidden={this.state.errorMsg.length === 0}
                    />
                    <Form.Field>
                        <label><b>Nom :</b></label>
                        <Input
                            fluid
                            value={this.state.nom}
                            onChange={(_, { value }) => this.setState({ nom: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><b>Prenom :</b></label>
                        <Input
                            fluid
                            value={this.state.prenom}
                            onChange={(_, { value }) => this.setState({ prenom: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><b>E-mail :</b></label>
                        <Input
                            fluid
                            type="email"
                            value={this.state.mail}
                            onChange={(_, { value }) => this.setState({ email: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><b>Mot de passe :</b></label>
                        <Input
                            fluid
                            type="password"
                            value={this.state.password}
                            onChange={(_, { value }) => this.setState({ password: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label><b>Confirmer le mot de passe :</b></label>
                        <Input
                            fluid
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={(_, { value }) => this.setState({ confirmPassword: value })}
                        />
                    </Form.Field>
                    <Divider />
                    <Button
                        fluid positive
                        loading={this.state.loading}
                        icon='add'
                        content="Ajouter"
                        onClick={this.handleSubmit}
                    />
                </Segment>
            </Modal>
        );
    }
}

ModalAdd.propTypes = {
    history: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default withRouter(ModalAdd);
