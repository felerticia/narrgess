// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Checkbox } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

// actions
import { addUser } from '../../../../../actions/add.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            email: "",
            password: "",
            tel: "",
            ville: "",
            dateEmbauche: moment(),
            coach: false,
            eleveDisplay: false,
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
            addUser(
                this.state.email,
                this.state.password,
                "moniteur",
                -1,
                {
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    tel: this.state.tel,
                    ville: this.state.ville,
                    dateEmbauche: this.state.dateEmbauche.toLocaleString(),
                    coach: this.state.coach,
                    eleveDisplay: this.state.eleveDisplay,
                }
            )
            .then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/moniteurs');
            })
            .catch(err => {
                this.setState({ errorMessage: err.message, loading: false })
            });
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
                    <DatePicker
                        dateFormat="DD/MM/YYYY"
                        label="Date d&#39;embauche :"
                        selected={this.state.dateEmbauche}
                        onChange={date => this.setState({ dateEmbauche: date })}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        toggle
                        label='Ce moniteur est un coach'
                        checked={this.state.coach}
                        onChange={(_, { checked }) => this.setState({ coach: checked })}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        toggle
                        label="Ce moniteur est affiché sur l'interface élève"
                        checked={this.state.eleveDisplay}
                        onChange={(_, { checked }) => this.setState({ eleveDisplay: checked })}
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