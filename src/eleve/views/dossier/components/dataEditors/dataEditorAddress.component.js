// React requirement
import React, { Component } from 'react';
import { Search, Grid, Button } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

// actions
import { requestSetFirebase } from '../../../../../actions/utils';

class DataEditorAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
        
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelect(adresse) {
        this.props.handleChange(adresse);
        this.setState({ loading: true });
        geocodeByAddress(adresse).then(results => {
            getLatLng(results[0]).then(coords => {
                this.handleSubmit(adresse, coords);
            });
        });
    }

    handleSubmit(adresse, coords) {
        const firebaseRefArray = this.props.firebaseRef.split('/');
        const firebaseRef = firebaseRefArray.slice(0, -1).join('/');
        requestSetFirebase(`${firebaseRef}/coords`, coords).then(() => {
            this.props.toggleEdit();
            this.props.handleSubmit(adresse);
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <Grid verticalAlign="middle">
                <Grid.Row columns={2} style={{ padding: "7px" }}>
                    <Grid.Column width={14}>
                    {
                        this.props.edit ?
                        <PlacesAutocomplete
                            value={this.props.value}
                            onChange={this.props.handleChange}
                            onSelect={this.handleSelect}
                        >
                        {
                            ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                const { onChange } = getInputProps();
                                return (
                                    <Search
                                        value={this.props.value}
                                        open={suggestions.length !== 0}
                                        input={{
                                            loading: this.state.loading,
                                            label: this.props.label,
                                            fluid: true,
                                            icon: 'search',
                                            onChange: event => {onChange(event); this.props.handleChange(event.target.value)},
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
                        </PlacesAutocomplete> :
                        <div>
                            <label><b>{this.props.label} : </b></label>
                            <span>{this.props.value}</span>
                        </div>
                    }
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button
                            circular
                            size="tiny"
                            loading={this.props.loading}
                            color={this.props.edit ? "green" : "orange"}
                            icon={this.props.edit ? "check" : "edit"}
                            onClick={this.props.toggleEdit}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

DataEditorAddress.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    edit: PropTypes.bool,
    firebaseRef: PropTypes.string,
    toggleEdit: PropTypes.func,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default DataEditorAddress;