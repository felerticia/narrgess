// React
import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { addEtablissement } from '../../../../../actions/add.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            nom: "",
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
            addEtablissement({
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