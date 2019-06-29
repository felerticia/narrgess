// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getAdmins } from '../../../../../actions/get.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {},
        };
    }

    UNSAFE_componentWillMount() {
        getAdmins().then(data => this.setState({ data, loading: false }));
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.loading}><Loader /></Dimmer>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Ville</Table.HeaderCell>
                            <Table.HeaderCell>Téléphone</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        Object.keys(this.state.data).map(key => (
                            <Table.Row key={key} onClick={() => this.props.history.push(`/admin/configuration/admins/${key}`)}>
                                <Table.Cell>{this.state.data[key].nom}</Table.Cell>
                                <Table.Cell>{this.state.data[key].prenom}</Table.Cell>
                                <Table.Cell>{this.state.data[key].ville}</Table.Cell>
                                <Table.Cell>{this.state.data[key].tel}</Table.Cell>
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
