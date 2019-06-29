// React
import React, { Component } from 'react';
import { Segment, Header, Table, Button, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';

// actions
import { getLieuxRDV, getMoniteursLieuxRDV, getLieuxRDVMoniteurs } from '../../../../../actions/get.action';
import { addLieuxRDVMoniteur, addMoniteurLieuxRDV } from '../../../../../actions/add.action';
import { deleteMoniteurLieuxRDV, deleteLieuxRDVMoniteur } from '../../../../../actions/delete.action';

class ListLieuxRDV extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loadingData: true,
            lieuxRDV: {},
            loadingLieux: true,
            lieuxToAdd: "",
            add: false,
        };

        this.fetchData = this.fetchData.bind(this);
        this.addLieuxRDV = this.addLieuxRDV.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        getLieuxRDV().then(lieuxRDV => this.setState({ lieuxRDV, loadingLieux: false }));
        this.fetchData();
    }

    fetchData() {
        this.setState({ loadingData: true });
        getMoniteursLieuxRDV(this.props.match.params.id).then(data => this.setState({ data, loadingData: false }));
    }

    addLieuxRDV() {
        this.setState({ loading: true });
        addLieuxRDVMoniteur(this.state.lieuxToAdd, { moniteur: this.props.match.params.id }).then(() => {
            addMoniteurLieuxRDV(this.props.match.params.id, { lieuxRDV: this.state.lieuxToAdd }).then(() => {
                this.fetchData();
                this.setState({ lieuxToAdd: "", add: false, loading: false });
            });
        });
    }

    toggleConfirm(moniteurKey, lieuxID) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(moniteurKey, lieuxID) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(moniteurKey, lieuxID) {
        deleteMoniteurLieuxRDV(this.props.match.params.id, moniteurKey);
        getLieuxRDVMoniteurs(lieuxID).then(moniteurs => {
            Object.keys(moniteurs).forEach(key => {
                if (moniteurs[key].moniteur === this.props.match.params.id) deleteLieuxRDVMoniteur(lieuxID, key);
            });
        });
    }

    render() {
        return (
            <Segment raised loading={this.state.loadingData || this.state.loadingLieux}>
                <Header textAlign="center">Lieux de RDV</Header>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Lieux de RDV</Table.HeaderCell>
                            <Table.HeaderCell>Adresse</Table.HeaderCell>
                            <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        Object.keys(this.state.data).map(key => {
                            const lieux = this.state.data[key];
                            const lieuxData = this.state.lieuxRDV[lieux.lieuxRDV] ? this.state.lieuxRDV[lieux.lieuxRDV] : {};
                            return (
                                <Table.Row key={key}>
                                    <Table.Cell>{lieuxData.nom}</Table.Cell>
                                    <Table.Cell>{lieuxData.adresse}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            negative
                                            circular
                                            icon='trash'
                                            onClick={() => this.toggleConfirm(key, lieux.lieuxRDV)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                    </Table.Body>
                </Table>
                <Button
                    circular
                    positive={!this.state.add}
                    negative={this.state.add}
                    icon={this.state.add ? 'close' : 'add'}
                    onClick={() => this.setState({ add: !this.state.add })}
                />
                <br />
                {
                    this.state.add &&
                    <div>
                        <br />
                        <Dropdown
                            search
                            selection
                            placeholder='Lieux de RDV...'
                            options={Object.keys(this.state.lieuxRDV).filter(lieuxId => !Object.values(this.state.data).find(e => e.lieuxRDV === lieuxId)).map(lieuxId => ({
                                key: lieuxId,
                                value: lieuxId,
                                text: `${this.state.lieuxRDV[lieuxId].nom}`
                            }))}
                            value={this.state.lieuxToAdd}
                            onChange={(_, { value }) => this.setState({ lieuxToAdd: value })}
                        />{' '}
                        <Button
                            positive
                            content="Ajouter"
                            onClick={this.addLieuxRDV}
                        />
                    </div>
                }
            </Segment>
        );
    }
}

ListLieuxRDV.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
};

export default withRouter(ListLieuxRDV);
