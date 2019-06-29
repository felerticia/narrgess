// React
import React, { Component } from 'react';
import { Input, Search } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

class SearchLieux extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(value) {
        this.setState({ value });
        geocodeByAddress(value).then(results => {
            getLatLng(results[0]).then(coords => {
                this.props.handleChangeCoords(coords);
            });
        });
    }

    render() {
        return (
            <div>
                <PlacesAutocomplete
                    value={this.state.value}
                    onChange={value => this.setState({ value })}
                    onSelect={this.handleSelect}
                >
                {
                    ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                        const { onChange } = getInputProps();
                        return (
                            <Search
                                value={this.state.value}
                                open={suggestions.length !== 0}
                                input={{
                                    onChange,
                                    fluid: true,
                                    placeholder: "Lieux ...",
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
                <br />
                <Input
                    fluid
                    type='range' min='1' max='50' step='1'
                    label={`Distance (${this.props.distance} km) :`}
                    value={this.props.distance}
                    onChange={(_, { value }) => this.props.handleChangeDistance(parseFloat(value))}
                />
            </div>
        );
    }
}

SearchLieux.propTypes = {
    coords: PropTypes.object,
    distance: PropTypes.number,
    handleChangeCoords: PropTypes.func,
    handleChangeDistance: PropTypes.func,
};

export default SearchLieux;
