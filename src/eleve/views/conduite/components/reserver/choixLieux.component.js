// React
import React, { Component } from 'react';
import { Segment, Header, Search } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

class ChoixLieux extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(lieux) {
        this.props.handleChange('lieux', lieux);
        geocodeByAddress(lieux).then(results => {
            getLatLng(results[0]).then(coords => {
                this.props.handleChange('coords', Object.assign(coords, { distance: 10 }));
            });
        });
    }

    render() {
        return (
            <Segment color="orange">
                <Header content="Lieux de RDV" textAlign="center" />
                <PlacesAutocomplete
                    value={this.props.lieux}
                    onChange={this.props.handleChange}
                    onSelect={this.handleSelect}
                >
                {
                    ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                        const { onChange } = getInputProps();
                        return (
                            <Search
                                value={this.props.lieux}
                                open={suggestions.length !== 0}
                                input={{
                                    fluid: true,
                                    placeholder: "Lieux ...",
                                    onChange: event => {onChange(event); this.props.handleChange('lieux', event.target.value);},
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
            </Segment>
        );
    }
}

ChoixLieux.propTypes = {
    lieux: PropTypes.string,
    coords: PropTypes.object,
    handleChange: PropTypes.func,
};

export default ChoixLieux;
