// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Search, Checkbox } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

// actions
import { addLieuxRDV } from '../../../../../actions/add.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            adresse: "",
            coords: {},
            simulateur: false,
            loading: false,
            errorMessage: "",
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelect(adresse) {
        this.setState({ adresse });
        geocodeByAddress(adresse).then(results => {
            getLatLng(results[0]).then(coords => {
                this.setState({ coords });
            });
        });
    }

    handleError() {
        let errorMessage = "";
        Object.keys(this.state).forEach(key => {
            if (key !== 'loading' && key !== 'errorMessage' && key !=='coords' && (this.state[key] === undefined || this.state[key].length === 0)) {
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
            addLieuxRDV({
                nom: this.state.nom,
                adresse: this.state.adresse,
                coords: this.state.coords,
                simulateur: this.state.simulateur,
            }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/lieuxRDV')
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
                        onChange={e => this.setState({ nom: e.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <PlacesAutocomplete
                        value={this.state.adresse}
                        onChange={adresse => this.setState({ adresse })}
                        onSelect={this.handleSelect}
                    >
                    {
                        ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                            const { onChange } = getInputProps();
                            return (
                                <Search
                                    value={this.state.adresse}
                                    open={suggestions.length !== 0 && Object.keys(this.state.coords).length === 0}
                                    input={{
                                        label: "Adresse :",
                                        fluid: true,
                                        placeholder: "Adresse...",
                                        onChange: event => {onChange(event); this.setState({ adresse: event.target.value, coords: {} })},
                                    }}
                                    results={suggestions.map(suggestion => ({ title: suggestion.description, suggestion }))}
                                    onResultSelect={(event, data) => {
                                        const { onClick } = getSuggestionItemProps(data.result.suggestion);
                                        onClick(event);
                                    }}
                                />
                            );
                        }
                    }
                    </PlacesAutocomplete>
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        toggle
                        label='Ce lieu possède un simulateur'
                        checked={this.state.simulateur}
                        onChange={(_, { checked }) => this.setState({ simulateur: checked })}
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