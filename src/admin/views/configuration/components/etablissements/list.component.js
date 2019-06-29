// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getEtablissements } from '../../../../../actions/get.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {},
        };
    }

    UNSAFE_componentWillMount() {
        getEtablissements().then(data => this.setState({ data, loading: false }));
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.loading}><Loader /></Dimmer>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        Object.keys(this.state.data).map(key => (
                            <Table.Row key={key} onClick={() => this.props.history.push(`/admin/configuration/etablissements/${key}`)}>
                                <Table.Cell>{this.state.data[key].code}</Table.Cell>
                                <Table.Cell>{this.state.data[key].nom}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

List.propTypes = {
    history: PropTypes.object,
}

export default List;
