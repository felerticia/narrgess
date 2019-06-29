// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getTypesRDV } from '../../../../../actions/get.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {},
        };
    }

    UNSAFE_componentWillMount() {
        getTypesRDV().then(data => this.setState({ data, loading: false }));
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.loading}><Loader /></Dimmer>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Couleur</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        Object.keys(this.state.data).map(key => (
                            <Table.Row key={key} onClick={() => this.props.history.push(`/admin/configuration/typesRDV/${key}`)}>
                                <Table.Cell>{this.state.data[key].nom}</Table.Cell>
                                <Table.Cell>
                                    <div style={{
                                        width: '60%',
                                        height: '20px',
                                        marginLeft: '20%',
                                        backgroundColor: this.state.data[key].couleur,
                                    }} />
                                </Table.Cell>
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
