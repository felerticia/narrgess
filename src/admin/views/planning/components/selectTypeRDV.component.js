// React
import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getTypesRDV } from '../../../../actions/get.action';

class SelectTypeRDV extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typesRDV: {},
            loading: true,
        };
    }

    UNSAFE_componentWillMount() {
        getTypesRDV()
        .then(typesRDV => this.setState({ typesRDV, loading: false }))
        .catch(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <Form loading={this.state.loading}>
                <Form.Field><Header as="h4" content="Type de RDV" /></Form.Field>
                {
                    this.state.typesRDV &&
                    Object.keys(this.state.typesRDV).map(typeRDV => (
                        <Form.Field key={typeRDV}>
                            <Form.Radio
                                label={this.state.typesRDV[typeRDV].nom}
                                value={typeRDV}
                                checked={this.props.typeRDV === typeRDV}
                                onClick={() => this.props.handleChange(typeRDV)}
                            />
                        </Form.Field>
                    ))
                }
            </Form>
        );
    }
}

SelectTypeRDV.propTypes = {
    handleChange: PropTypes.func,
    typeRDV: PropTypes.string,
}

export default SelectTypeRDV;
