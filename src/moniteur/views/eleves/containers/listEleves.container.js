// React
import React, { Component } from 'react';
import { Segment, Header, Table, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getEleves } from '../../../../actions/get.action';

class ListEleves extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eleves: {},
            payload: "",
            loading: true,
        };

        this.filterSearch = this.filterSearch.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getEleves().then(allEleves => {
            const eleves = {};
            Object.keys(allEleves).forEach(key => {
                const eleve = allEleves[key];
                const planning = eleve.planning ? eleve.planning : {};
                if (_.filter(planning, p => p.moniteur === uid).length !== 0) eleves[key] = eleve;
            });
            this.setState({ eleves, loading: false, });
        });
    }

    filterSearch(key) {
        const { payload } = this.state;
        if (payload.length === 0) return true;
        const regExp = new RegExp(_.escapeRegExp(payload), 'i');
        return (
            regExp.test(this.state.eleves[key].dossier.eleve.nom) ||
            regExp.test(this.state.eleves[key].dossier.eleve.prenom) ||
            regExp.test(`${this.state.eleves[key].dossier.eleve.nom} ${this.state.eleves[key].dossier.eleve.prenom}`) ||
            regExp.test(`${this.state.eleves[key].dossier.eleve.prenom} ${this.state.eleves[key].dossier.eleve.nom}`) ||
            regExp.test(this.state.eleves[key].dossier.eleve.tel)
        );
    }

    render() {
        return (
            <Segment color="orange" loading={this.state.loading}>
                <Header content="Liste de vos élèves" textAlign="center" />
                <Input
                    fluid
                    placeholder="Search..."
                    value={this.state.payload}
                    onChange={(_, { value }) => this.setState({ payload: value })}
                />
                <Table striped stackable selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Mobile</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.eleves &&
                        _.filter(Object.keys(this.state.eleves), this.filterSearch).map(key => {
                            const eleve = this.state.eleves[key];
                            const dossier = eleve.dossier ? eleve.dossier.eleve ? eleve.dossier.eleve : {} : {};
                            return (
                                <Table.Row key={key} onClick={() => this.props.history.push(`/moniteur/eleves/${key}`)}>
                                    <Table.Cell>{dossier.nom ? dossier.nom : ""}</Table.Cell>
                                    <Table.Cell>{dossier.prenom ? dossier.prenom : ""}</Table.Cell>
                                    <Table.Cell>{dossier.tel ? dossier.tel : ""}</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

ListEleves.propTypes = {
    history: PropTypes.object,
};

export default ListEleves;
