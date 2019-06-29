// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getBoutiques } from '../../../../../actions/get.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payload: "",
            loading: true,
            data: {},
            boutique: {},
        };

        this.handleChangePayload = this.handleChangePayload.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(data => this.setState({ data, boutique: data, loading: false }));
    }

    handleChangePayload(payload) {
        let boutique = {};
        if (payload.length < 1) {
            boutique = this.state.data;
        } else {
            const regExp = new RegExp(_.escapeRegExp(payload), 'i');
            const keys = _.filter(Object.keys(this.state.data), key => (
                regExp.test(this.state.data[key].nom) ||
                regExp.test(this.state.data[key].type) ||
                regExp.test(this.state.data[key].prix) ||
                regExp.test(this.state.data[key].tva)
            ));
            keys.forEach(key => boutique[key] = this.state.data[key]);
        }
        this.setState({ payload, boutique });
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.loading}><Loader /></Dimmer>
                <Input
                    fluid
                    type='text'
                    icon='search'
                    placeholder='Rechercher...'
                    value={this.state.payload}
                    onChange={e => this.handleChangePayload(e.target.value)}
                />
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Prix TTC</Table.HeaderCell>
                            <Table.HeaderCell>TVA</Table.HeaderCell>
                            <Table.HeaderCell>Nombre de versements</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        Object.keys(this.state.boutique).map(key => (
                            <Table.Row key={key} onClick={() => this.props.history.push(`/admin/configuration/boutique/${key}`)}>
                                <Table.Cell>{this.state.boutique[key].nom}</Table.Cell>
                                <Table.Cell>{this.state.boutique[key].type}</Table.Cell>
                                <Table.Cell>{this.state.boutique[key].prix} €</Table.Cell>
                                <Table.Cell>{this.state.boutique[key].tva} %</Table.Cell>
                                <Table.Cell>{this.state.boutique[key].versements}</Table.Cell>
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
