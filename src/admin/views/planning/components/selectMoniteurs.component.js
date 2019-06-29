// React
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getMoniteurs } from '../../../../actions/get.action';

class SelectMoniteurs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            moniteurs: {},
        };
    }

    UNSAFE_componentWillMount() {
        getMoniteurs()
        .then(moniteurs => this.setState({ moniteurs, loading: false }))
        .catch(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <Dropdown
                fluid multiple search selection
                value={this.props.moniteurs}
                loading={this.state.loading}
                placeholder="Moniteurs ... (facultatif)"
                onChange={(_, { value }) => this.props.handleChange(value)}
                options={Object.keys(this.state.moniteurs).map(key => ({
                    key,
                    value: key,
                    text: `${this.state.moniteurs[key].nom} ${this.state.moniteurs[key].prenom}`
                }))}
            />
        );
    }
}

SelectMoniteurs.propTypes = {
    handleChange: PropTypes.func,
    moniteurs: PropTypes.array,
}

export default SelectMoniteurs;
