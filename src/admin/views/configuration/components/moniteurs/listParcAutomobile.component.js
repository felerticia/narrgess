// React
import React, { Component } from 'react';
import { Segment, Header, Table, Button, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';

// actions
import { getMoniteursParcAutomobile } from '../../../../../actions/get.action';
import { addMoniteurParcAutomobile } from '../../../../../actions/add.action';
import { deleteMoniteurParcAutomobile } from '../../../../../actions/delete.action';

class ListParcAutomobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            automobileImmat: "",
            automobileMarque: "",
            loadingData: true,
            add: false,
            loading: false,
        };

        this.fetchData = this.fetchData.bind(this);
        this.addParcAutomobile = this.addParcAutomobile.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({ loadingData: true });
        getMoniteursParcAutomobile(this.props.match.params.id).then(data => this.setState({ data, loadingData: false }));
    }

    addParcAutomobile() {
        this.setState({ loading: true });
        addMoniteurParcAutomobile(this.props.match.params.id, {
            immatriculation: this.state.automobileImmat,
            marque: this.state.automobileMarque,
        }).then(() => {
            this.fetchData();
            this.setState({ automobileImmat: "", automobileMarque: "", add: false, loading: false });
        });
    }

    toggleConfirm(parcId) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(parcId) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(parcId) {
        deleteMoniteurParcAutomobile(this.props.match.params.id, parcId).then(() => {
            this.fetchData();
        });
    }

    render() {
        return (
            <Segment raised loading={this.state.loadingData}>
                <Header textAlign="center">Parc Automobile</Header>
                <Table singleLine striped selectable fixed textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Immatriculation</Table.HeaderCell>
                            <Table.HeaderCell>Marque de la voiture</Table.HeaderCell>
                            <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.data &&
                        Object.keys(this.state.data) &&
                        Object.keys(this.state.data).map(key => {
                            return (
                                <Table.Row key={key}>
                                    <Table.Cell>{this.state.data[key].immatriculation}</Table.Cell>
                                    <Table.Cell>{this.state.data[key].marque}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            negative circular
                                            icon='trash'
                                            onClick={() => this.toggleConfirm(key)}
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
                    <Segment raised>
                        <Form.Input
                            fluid
                            placeholder="Immatriculation"
                            value={this.state.automobileImmat}
                            onChange={(_, { value }) => this.setState({ automobileImmat: value })}
                        />
                        <br />
                        <Form.Input
                            fluid
                            placeholder="Marque"
                            value={this.state.automobileMarque}
                            onChange={(_, { value }) => this.setState({ automobileMarque: value })}
                        />
                        <br />
                        <Button
                            positive fluid
                            icon="plus"
                            content="Ajouter"
                            onClick={this.addParcAutomobile}
                        />
                    </Segment>
                }
            </Segment>
        );
    }
}

ListParcAutomobile.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
};

export default withRouter(ListParcAutomobile);
