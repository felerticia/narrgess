// React
import React, { Component } from 'react';
import { Segment, Grid, Button, Label, Header } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import Planning from '../components/planning/';
import Competences from '../components/competences/';
import Estimation from '../components/estimation/';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getEleve, getExamenPreInscriptions } from '../../../../actions/get.action';
import { addExamenPreInscriptions } from '../../../../actions/add.action';
import { deletePreInscriptionExamens } from '../../../../actions/delete.action';

class Eleve extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eleve: {},
            preinscrit: false,
            loadingEleve: true,
            loadingPreInscript: true,
            loadingButtonPreInscription: false,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleClickPreInscription = this.handleClickPreInscription.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
        getEleve(this.props.match.params.id).then(eleve => this.setState({ eleve, loadingEleve: false }));

    }

    fetchData() {
        const { uid } = getLoggedUser();
        this.setState({ loadingPreInscript: true });
        getExamenPreInscriptions().then(preInscriptions => {
            const preinscrit = Object.values(preInscriptions).find(val => val.eleve === this.props.match.params.id && val.moniteur === uid);
            this.setState({ preinscrit, loadingPreInscript: false });
        });
    }

    handleClickPreInscription() {
        this.setState({ loadingButtonPreInscription: true });
        const { uid } = getLoggedUser();
        if (this.state.preinscrit) {
            getExamenPreInscriptions().then(preInscriptions => {
                Object.keys(preInscriptions).forEach(key => {
                    if (preInscriptions[key].eleve === this.props.match.params.id && preInscriptions[key].moniteur === uid) {
                        deletePreInscriptionExamens(key).then(() => {
                            this.setState({ loadingButtonPreInscription: false })
                            this.fetchData();
                        });
                    }
                });
            });
        } else {
            addExamenPreInscriptions({
                eleve: this.props.match.params.id,
                moniteur: uid,
                date: new Date().toString(),
            }).then(() => {
                this.setState({ loadingButtonPreInscription: false });
                this.fetchData();
            });
        }
    }

    render() {
        const eleveDossier = this.state.eleve.dossier ? this.state.eleve.dossier : {};
        const dossierEleve = eleveDossier.eleve ? eleveDossier.eleve : {};
        return (
            <div>
                <Segment color="orange" loading={this.state.loadingEleve || this.state.loadingPreInscript}>
                    <Header textAlign="center" content={`${dossierEleve.nom} ${dossierEleve.prenom}`} />
                    <Label
                        as='a'
                        icon='arrow left'
                        attached='top left'
                        onClick={() => this.props.history.push('/moniteur/eleves')}
                    />
                    <Button
                        fluid
                        icon={this.state.preinscrit ? "close" : "add"}
                        content={this.state.preinscrit ? "Retirer la pré-inscription" : "Pré-inscrire à un examen"}
                        positive={!this.state.preinscrit}
                        negative={this.state.preinscrit}
                        loading={this.state.loadingButtonPreInscription}
                        onClick={this.handleClickPreInscription}
                    />
                    <br />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={8} tablet={16}>
                                <Button
                                    fluid inverted
                                    icon="calendar"
                                    content="Planning élève"
                                    color="orange"
                                    active={this.props.location.pathname.split('/')[4] === 'planning'}
                                    onClick={() => this.props.history.push(`/moniteur/eleves/${this.props.match.params.id}/planning`)}
                                />
                                <br />
                            </Grid.Column>
                            <Grid.Column computer={8} tablet={16}>
                                <Button
                                    fluid inverted
                                    icon="star"
                                    content="Compétences"
                                    color="orange"
                                    active={this.props.location.pathname.split('/')[4] === 'competences'}
                                    onClick={() => this.props.history.push(`/moniteur/eleves/${this.props.match.params.id}/competences`)}
                                />
                                <br />
                            </Grid.Column>
                            {
                                this.state.eleve.planning &&
                                _.filter(this.state.eleve.planning, p => new Date(p.date) < new Date()).length >= 12 &&
                                <Grid.Column computer={8} tablet={16}>
                                    <Button
                                        fluid inverted
                                        icon="chart line"
                                        content="Estimation d'heures"
                                        color="orange"
                                        active={this.props.location.pathname.split('/')[4] === 'estimation'}
                                        onClick={() => this.props.history.push(`/moniteur/eleves/${this.props.match.params.id}/estimation`)}
                                    />
                                    <br />
                                </Grid.Column>
                            }
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Switch>
                    <Route path="/moniteur/eleves/:id/planning" component={Planning} />
                    <Route path="/moniteur/eleves/:id/competences" component={Competences} />
                    <Route path="/moniteur/eleves/:id/estimation" component={Estimation} />
                    <Redirect to={`/moniteur/eleves/${this.props.match.params.id}/planning`} />
                </Switch>
            </div>
        );
    }
}

Eleve.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
};

export default Eleve;