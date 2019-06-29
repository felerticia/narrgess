// React
import React, { Component } from 'react';
import { Segment, Menu, Label, Button, Header, Message } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import Dossier from './eleveContainers/dossier.container';
import Compte from './eleveContainers/compte.container';
import Planning from './eleveContainers/planning.container';
import Examens from './eleveContainers/examens.container';
import Notes from './eleveContainers/notes.container';
import Estimations from './eleveContainers/estimations.container';

// actions
import { getEleveEstimations, getEleveDossier, getEleve, getUser } from '../../../../actions/get.action';
import { editEleveArchive, editUserArchive } from '../../../../actions/edit.action';
import { deleteEleve, deleteUser } from '../../../../actions/delete.action';

class Eleve extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            estimations: {},
            eleveName: "",
            loading: true,
        };

        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        getEleveEstimations(id).then(estimations => {
            getEleveDossier(id).then(dossier => {
                const eleveName = `${dossier.eleve.nom} ${dossier.eleve.prenom}`;
                this.setState({
                    estimations,
                    eleveName,
                    loading: false,
                });                
            });
        });
    }

    toggleConfirm() {
        confirmAlert({
            title: "Archiver",
            message: `Voulez-vous vraiment archiver cette donnée ?`,
            buttons: [
                { label: "Oui", onClick: this.handleArchive },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleArchive() {
        const { id } = this.props.match.params;
        this.setState({ loading: true, errorMessage: "" });
        getEleve(id).then(eleve => {
            getUser(id).then(user => {
                this.props.history.push('/admin/eleves/list');
                editEleveArchive(id, eleve).then(() => {
                    editUserArchive(id, user).then(() => {
                        deleteEleve(id).then(() => {
                            deleteUser(id).then(() => {
                                this.setState({ loading: false });
                            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                        }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                    }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loading}>
                <Label
                    as='a'
                    size='large'
                    icon='arrow left'
                    attached='top left'
                    onClick={() => this.props.history.push('/admin/eleves')}
                />
                <Message
                    negative
                    hidden={this.state.errorMessage.length === 0}
                    header="Erreur"
                    content={this.state.errorMessage}
                />
                <Header textAlign="center" content={this.state.eleveName} />
                <Menu pointing fluid>
                    <Menu.Item
                        name='Dossier élève'
                        active={this.props.location.pathname.split('/')[4] === 'dossier'}
                        onClick={() => this.props.history.push('dossier')}

                    />
                    <Menu.Item
                        name='Compte'
                        active={this.props.location.pathname.split('/')[4] === 'compte'}
                        onClick={() => this.props.history.push('compte')}
                    />
                    <Menu.Item
                        name='Planning'
                        active={this.props.location.pathname.split('/')[4] === 'planning'}
                        onClick={() => this.props.history.push('planning')}
                    />
                    <Menu.Item
                        name='Examens'
                        active={this.props.location.pathname.split('/')[4] === 'examens'}
                        onClick={() => this.props.history.push('examens')}
                    />
                    <Menu.Item
                        name='Notes'
                        active={this.props.location.pathname.split('/')[4] === 'notes'}
                        onClick={() => this.props.history.push('notes')}
                    />
                    <Menu.Item
                        active={this.props.location.pathname.split('/')[4] === 'estimations'}
                        onClick={() => this.props.history.push('estimations')}
                    >
                        Estimations
                        {
                            _.filter(this.state.estimations, e => !e.viewed).length !== 0 &&
                            <Label color='red' floating>{_.filter(this.state.estimations, e => !e.viewed).length}</Label>
                        }
                    </Menu.Item>
                </Menu>
                <Switch>
                    <Route path='/admin/eleves/:id/dossier' component={Dossier} />
                    <Route path='/admin/eleves/:id/compte' component={Compte} />
                    <Route path='/admin/eleves/:id/planning' component={Planning} />
                    <Route path='/admin/eleves/:id/examens' component={Examens} />
                    <Route path='/admin/eleves/:id/notes' component={Notes} />
                    <Route path='/admin/eleves/:id/estimations' component={Estimations} />
                    <Redirect to={`/admin/eleves/${this.props.match.params.id}/dossier`} />
                </Switch>
                <Button
                    fluid
                    color='orange'
                    icon='archive'
                    content='Archiver'
                    onClick={() => this.toggleConfirm()}
                />
            </Segment>
        );
    }
}

Eleve.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
};

export default Eleve;
