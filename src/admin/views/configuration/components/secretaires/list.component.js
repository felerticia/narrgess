// React
import React, { Component } from 'react';
import { Table, Dimmer, Loader, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getSecretaires } from '../../../../../actions/get.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payload: "",
            loading: true,
            data: {},
            secretaires: {},
        };

        this.handleChangePayload = this.handleChangePayload.bind(this);
    }

    UNSAFE_componentWillMount() {
        getSecretaires().then(data => this.setState({ data, secretaires: data, loading: false }));
    }

    handleChangePayload(payload) {
        let secretaires = {};
        if (payload.length < 1) {
            secretaires = this.state.data;
        } else {
            const regExp = new RegExp(_.escapeRegExp(payload), 'i');
            const keys = _.filter(Object.keys(this.state.data), key => (
                regExp.test(this.state.data[key].nom) ||
                regExp.test(this.state.data[key].prenom) ||
                regExp.test(`${this.state.data[key].nom} ${this.state.data[key].prenom}`) ||
                regExp.test(`${this.state.data[key].prenom} ${this.state.data[key].nom}`) ||
                regExp.test(this.state.data[key].ville) ||
                regExp.test(this.state.data[key].tel)
            ));
            keys.forEach(key => secretaires[key] = this.state.data[key]);
        }
        this.setState({ payload, secretaires });
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
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Ville</Table.HeaderCell>
                            <Table.HeaderCell>Téléphone</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.secretaires &&
                        Object.keys(this.state.secretaires) &&
                        Object.keys(this.state.secretaires).map(key => (
                            <Table.Row key={key} onClick={() => this.props.history.push(`/admin/configuration/secretaires/${key}`)}>
                                <Table.Cell>{this.state.secretaires[key].nom}</Table.Cell>
                                <Table.Cell>{this.state.secretaires[key].prenom}</Table.Cell>
                                <Table.Cell>{this.state.secretaires[key].ville}</Table.Cell>
                                <Table.Cell>{this.state.secretaires[key].tel}</Table.Cell>
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
};

export default List;
