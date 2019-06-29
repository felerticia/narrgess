// React requirement
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

// actions
import { editEleve } from '../../../../../actions/edit.action';

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
        const payloads = {};
        const splitted_ref = this.props.firebaseRef.split("/");
        const id = splitted_ref[2];
        let sub_payloads = payloads;
        for (let i = 3; i < splitted_ref.length-1; i += 1) {
            sub_payloads[splitted_ref[i]] = {};
            sub_payloads = sub_payloads[splitted_ref[i]];
        }
        sub_payloads["coords"] = coords;
        editEleve(id, payloads).then(() => {
            this.props.toggleFocus(false);
            this.props.handleSubmit(adresse);
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.props.data}
                onChange={this.props.handleChange}
                onSelect={this.handleSelect}
            >
            {
                ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                    const { onChange } = getInputProps();
                    return (
                        <Search
                            value={this.props.data}
                            open={suggestions.length !== 0}
                            input={{
                                loading: this.state.loading,
                                label: this.props.label,
                                fluid: true,
                                focus: this.props.focus,
                                transparent: !this.props.hover,
                                icon: this.props.hover ? 'search' : '',
                                onFocus: () => this.props.toggleFocus(true),
                                onMouseEnter: () => this.props.toggleHover(true),
                                onMouseLeave: () => this.props.toggleHover(false),
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
            </PlacesAutocomplete>
        );
    }
}

DataEditorAddress.propTypes = {
    label: PropTypes.string,
    data: PropTypes.string,
    hover: PropTypes.bool,
    focus: PropTypes.bool,
    firebaseRef: PropTypes.string,
    toggleHover: PropTypes.func,
    toggleFocus: PropTypes.func,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default DataEditorAddress;