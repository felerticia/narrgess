// React
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

// actions
import { getEtablissement } from '../../../../../actions/get.action';
import { editEtablissement } from '../../../../../actions/edit.action';
import { deleteEtablissement } from '../../../../../actions/delete.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            nom: "",
            loading: true,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEtablissement(this.props.match.params.id).then(etablissement => {
            this.setState({
                code: etablissement.code,
                nom: etablissement.nom,
                loading: false,
            });
        });
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
            editEtablissement(this.props.match.params.id, {
                code: this.state.code,
                nom: this.state.nom,
            }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/etablissements');
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    toggleConfirm() {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: this.handleDelete },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete() {
        this.props.history.push('/admin/configuration/etablissements');
        deleteEtablissement(this.props.match.params.id);
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
                            label="Code :"
                            placeholder='Code...'
                            value={this.state.code}
                            onChange={(_, { value }) => this.setState({ code: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label="Nom :"
                            placeholder='Nom...'
                            value={this.state.nom}
                            onChange={(_, { value }) => this.setState({ nom: value })}
                        />
                    </Form.Field>
                </Form>
                <br />
                <Button.Group fluid widths={8}>
                    <Button
                        positive
                        icon='edit'
                        content='Modifier'
                        onClick={this.handleSubmit}
                    />
                    <Button
                        negative
                        icon='trash'
                        content='Supprimer'
                        onClick={this.toggleConfirm}
                    />
                </Button.Group>
            </div>
        );
    }
}

Edit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Edit;