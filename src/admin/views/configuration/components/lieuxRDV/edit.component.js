// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Segment, Search, Checkbox } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

// Local
import ListMoniteurs from './listMoniteurs.component'

// actions
import { getLieuRDV, getMoniteurs } from '../../../../../actions/get.action';
import { editLieuxRDV } from '../../../../../actions/edit.action';
import { deleteLieuxRDV, deleteMoniteurLieuxRDV } from '../../../../../actions/delete.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            adresse: "",
            coords: {},
            simulateur: false,
            moniteurs: {},
            loading: true,
            errorMessage: "",
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        getLieuRDV(this.props.match.params.id).then(lieux => {
            this.setState({
                nom: lieux.nom,
                adresse: lieux.adresse,
                coords: lieux.coords,
                simulateur: lieux.simulateur,
                moniteurs: lieux.moniteurs ? lieux.moniteurs : {},
                loading: false,
            });
        });
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
            if (key !== 'loading' && key !== 'errorMessage' && key !== 'moniteurs' && key !=='coords' && (this.state[key] === undefined || this.state[key].length === 0)) {
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
            editLieuxRDV(this.props.match.params.id, {
                nom: this.state.nom,
                adresse: this.state.adresse,
                coords: this.state.coords,
                simulateur: this.state.simulateur,
                moniteurs: this.state.moniteurs,
            }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/lieuxRDV')
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
        deleteLieuxRDV(this.props.match.params.id).then(() => {
            getMoniteurs().then(moniteurs => {
                Object.keys(moniteurs).forEach(moniteurId => {
                    const moniteur = moniteurs[moniteurId];
                    Object.keys(moniteur.lieuxRDV).forEach(lieuxDataKey => {
                        const { lieuxRDV } = moniteur.lieuxRDV[lieuxDataKey];
                        if (lieuxRDV === this.props.match.params.id) deleteMoniteurLieuxRDV(moniteurId, lieuxDataKey);
                    });
                });
            });
        });
        this.props.history.push('/admin/configuration/lieuxRDV');
    }

    render() {
        return (
            <div>
                <Segment raised>
                    <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                        <Message
                            negative
                            hidden={this.state.errorMessage.length === 0}
                            header="Erreur"
                            content={this.state.errorMessage}
                        />
                        <Form.Field>
                            <label>Nom :</label>
                            <Input
                                fluid
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
                    </Form>
                    <br />
                    <Button
                        fluid positive
                        icon='edit'
                        content='Modifier'
                        onClick={this.handleSubmit}
                    />
                </Segment>
                <ListMoniteurs />
                <Button
                    fluid negative
                    icon='trash'
                    content='Supprimer'
                    onClick={this.toggleConfirm}
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