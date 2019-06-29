// React
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { HuePicker } from 'react-color';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

// actions
import { getTypeRDV } from '../../../../../actions/get.action';
import { editTypeRDV } from '../../../../../actions/edit.action';
import { deleteTypeRDV } from '../../../../../actions/delete.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            couleur: "",
            needsMoniteur: false,
            loading: true,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        getTypeRDV(this.props.match.params.id).then(type => {
            this.setState({
                nom: type.nom,
                couleur: type.couleur,
                needsMoniteur: type.needsMoniteur,
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
            editTypeRDV(this.props.match.params.id, {
                nom: this.state.nom,
                needsMoniteur: this.state.needsMoniteur,
                couleur: this.state.couleur,
            }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/typesRDV');
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
        this.props.history.push('/admin/configuration/typesRDV');
        deleteTypeRDV(this.props.match.params.id);
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
                        <Form.Radio
                            toggle
                            label="Nécessite un moniteur"
                            checked={this.state.needsMoniteur}
                            onClick={() => this.setState({ needsMoniteur: !this.state.needsMoniteur })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <HuePicker
                            width='100%'
                            label="Couleur :"
                            color={this.state.couleur}
                            onChange={color => this.setState({ couleur: color.hex })}
                        />
                        <div style={{
                            width: '100px',
                            height: '30px',
                            margin: '10px',
                            backgroundColor: this.state.couleur,
                        }} />
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