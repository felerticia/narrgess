// React
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getEleves } from '../../../../actions/get.action';

class SearchEleve extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            searchResults: [],
            eleves: {},
            value: "",
        };

        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEleves()
        .then(eleves => this.setState({ eleves, loading: false }))
        .catch(() => this.setState({ loading: false }));
    }

    handleResultSelect(_, { result }) {
        this.setState({ loading: false, value: result.title });
        this.props.handleChange(result.id);
    }

    resetSearch() {
        this.setState({
            loading: false,
            searchResults: [],
            value: "",
        });
    }

    handleSearchChange(__, { value }) {
        this.setState({ loading: true, value });
        setTimeout(() => {
            if (this.state.value.length < 1) {
                this.resetSearch();
            } else {
                const regex = new RegExp(_.escapeRegExp(this.state.value), 'i');
                const isMatch = key => (
                    regex.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve.nom : "") ||
                    regex.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve.prenom : "") ||
                    regex.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve.nom + " " + this.state.eleves[key].dossier.eleve.prenom : "") ||
                    regex.test(this.state.eleves[key].dossier ? this.state.eleves[key].dossier.eleve.prenom + " " + this.state.eleves[key].dossier.eleve.nom : "")
                );
                this.setState({
                    loading: false,
                    searchResults: _.filter(Object.keys(this.state.eleves), isMatch).map(key => ({
                        id: key,
                        title: `${this.state.eleves[key].dossier.eleve.nom} ${this.state.eleves[key].dossier.eleve.prenom}`,
                    })),
                });
            }
        }, 300);
    }

    render() {
        return (
            <Search
                fluid
                showNoResults={false}
                input={{ fluid: true, placeholder: 'Eleve ...' }}
                loading={this.state.loading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={this.state.searchResults}
                value={this.state.value}
            />
        );
    }
}

SearchEleve.propTypes = {
    handleChange: PropTypes.func,
    eleve: PropTypes.string,
}

export default SearchEleve;
