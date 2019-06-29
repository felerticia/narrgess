// React
import React, { Component } from 'react';
import { Segment, Header, Table, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';

// actions
import { getMoniteurs, getMoniteurArchives, getLieuxRDVMoniteurs, getMoniteursLieuxRDV } from '../../../../../actions/get.action';
import { addMoniteurLieuxRDV, addLieuxRDVMoniteur } from '../../../../../actions/add.action';
import { deleteLieuxRDVMoniteur, deleteMoniteurLieuxRDV } from '../../../../../actions/delete.action';

class ListMoniteurs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loadingData: true,
            moniteurs: {},
            loadingMoniteurs: true,
            moniteurToAdd: "",
            add: false,
        };

        this.fetchData = this.fetchData.bind(this);
        this.addMoniteur = this.addMoniteur.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        getMoniteurs().then(moniteurs => {
            getMoniteurArchives().then(archives => {
                this.setState({
                    moniteurs: {...moniteurs, ...archives},
                    loadingMoniteurs: false,
                });
            });
        });
        this.fetchData();
    }

    fetchData() {
        this.setState({ loadingData: true });
        getLieuxRDVMoniteurs(this.props.match.params.id).then(data => this.setState({ data, loadingData: false }));
    }

    addMoniteur() {
        this.setState({ loading: true });
        addMoniteurLieuxRDV(this.state.moniteurToAdd, { lieuxRDV: this.props.match.params.id }).then(() => {
            addLieuxRDVMoniteur(this.props.match.params.id, { moniteur: this.state.moniteurToAdd }).then(() => {
                this.fetchData();
                this.setState({
                    moniteurToAdd: "",
                    add: false,
                    loading: false,
                });
            });
        });
    }

    toggleConfirm(lieuxKey, moniteurId) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(lieuxKey, moniteurId) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(lieuxKey, moniteurId) {
        deleteLieuxRDVMoniteur(this.props.match.params.id, lieuxKey);
        getMoniteursLieuxRDV(moniteurId).then(lieux => {
            Object.keys(lieux).forEach(key => {
                if (lieux[key].lieuxRDV === this.props.match.params.id) deleteMoniteurLieuxRDV(moniteurId, key);
            });
        });
    }

    render() {
        return (
            <Segment raised loading={this.state.loadingMoniteurs || this.state.loadingData}>
                <Header textAlign="center">Moniteurs</Header>
                <Table singleLine striped textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Moniteur</Table.HeaderCell>
                            <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        Object.keys(this.state.data).map(key => {
                            const moniteur = this.state.data[key];
                            const moniteurData = this.state.moniteurs[moniteur.moniteur] ? this.state.moniteurs[moniteur.moniteur] : {};
                            return (
                                <Table.Row key={key}>
                                    <Table.Cell>{moniteurData.nom} {moniteurData.prenom}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            negative
                                            circular
                                            icon='trash'
                                            onClick={() => this.toggleConfirm(key, moniteur.moniteur)}
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
                            placeholder='Moniteur...'
                            options={Object.keys(this.state.moniteurs).filter(moniteurId => !Object.values(this.state.data).find(e => e.moniteur === moniteurId)).map(moniteurId => ({
                                key: moniteurId,
                                value: moniteurId,
                                text: `${this.state.moniteurs[moniteurId].nom} ${this.state.moniteurs[moniteurId].prenom}`
                            }))}
                            value={this.state.moniteurToAdd}
                            onChange={(_, { value }) => this.setState({ moniteurToAdd: value })}
                        />{' '}
                        <Button
                            positive
                            content="Ajouter"
                            onClick={this.addMoniteur}
                        />
                    </div>
                }
            </Segment>
        );
    }
}

ListMoniteurs.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
};

export default withRouter(ListMoniteurs);
