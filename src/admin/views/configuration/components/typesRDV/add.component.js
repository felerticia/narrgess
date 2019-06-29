// React
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { HuePicker } from 'react-color';
import PropTypes from 'prop-types';

// actions
import { addTypeRDV } from '../../../../../actions/add.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            couleur: "#000",
            needsMoniteur: false,
            loading: false,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            addTypeRDV({
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