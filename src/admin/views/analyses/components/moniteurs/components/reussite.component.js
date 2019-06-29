// React
import React, { Component } from 'react';
import { Segment, Header, Statistic, Grid } from 'semantic-ui-react';
import PropType from 'prop-types';
import _ from 'lodash';

// actions
import { getEleves, getExamens, getExamenPreInscriptions } from '../../../../../../actions/get.action';

class Reussite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            examens: [],
            preInscriptions: [],
            eleves: [],
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
        this.getNbTotalExamens = this.getNbTotalExamens.bind(this);
        this.getNbPreInscriptions = this.getNbPreInscriptions.bind(this);
        this.getReussite = this.getReussite.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.fetchData(nextProps.id);
        }
    }

    fetchData(id) {
        this.setState({ loading: true });
        getEleves().then(allEleves => {
            getExamens().then(allExamens => {
                getExamenPreInscriptions().then(allPreInscriptions => {
                    const preInscriptions = [];
                    const eleves = [];
                    const examens = Object.values(allExamens);
                    Object.values(allPreInscriptions).forEach(preInscription => {
                        if (preInscription.moniteur === id) preInscriptions.push(preInscription);
                    });
                    Object.keys(allEleves).forEach(key => {
                        if (Object.values(allEleves[key].planning ? allEleves[key].planning : {}).find(p => p.moniteur === id)) eleves.push(key);
                    });
                    this.setState({
                        eleves,
                        examens,
                        preInscriptions,
                        loading: false,
                    });
                });
            });
        });
    }

    getNbTotalExamens() {
        let nbTotalExamens = 0;
        this.state.eleves.forEach(eleve => {
            _.filter(this.state.examens, examen => examen.type === "Conduite").forEach(examen => {
                const examenEleves = examen.eleves ? examen.eleves : {};
                Object.values(examenEleves).forEach(examenEleve => {
                    if (examenEleve.eleve === eleve && examenEleve.result && examenEleve.result !== "" && examenEleve.result !== "Annulé") nbTotalExamens += 1;
                });
            });
        });
        return nbTotalExamens;
    }

    getNbPreInscriptions() {
        let totalPreInscriptions = 0;
        this.state.preInscriptions.forEach(preInscription => {
            const { eleve, date } = preInscription;
            _.filter(this.state.examens, examen => new Date(examen.start) >= new Date(date) && examen.type === "Conduite").forEach(examen => {
                const examenEleves = examen.eleves ? examen.eleves : {};
                Object.values(examenEleves).forEach(examenEleve => {
                    if (examenEleve.eleve === eleve && examenEleve.result && examenEleve.result !== "" && examenEleve.result !== "Annulé") totalPreInscriptions += 1;
                });
            });
        });
        return totalPreInscriptions;
    }

    getReussite() {
        let nbTotalExamens = this.getNbTotalExamens();
        let nbTotalReussites = 0;
        this.state.eleves.forEach(eleve => {
            _.filter(this.state.examens, examen => examen.type === "Conduite").forEach(examen => {
                const examenEleves = examen.eleves ? examen.eleves : {};
                Object.values(examenEleves).forEach(examenEleve => {
                    if (examenEleve.eleve === eleve && examenEleve.result && examenEleve.result === "Obtenu") nbTotalReussites += 1;
                });
            });
        });
        if (nbTotalExamens === 0) return 0;
        return parseInt(nbTotalReussites/nbTotalExamens*100, 10);
    }

    getReussitePreInscription() {
        let totalReussitesPreInscriptions = 0;
        this.state.preInscriptions.forEach(preInscription => {
            const { eleve, date } = preInscription;
            _.filter(this.state.examens, examen => new Date(examen.start) >= new Date(date) && examen.type === "Conduite").forEach(examen => {
                const examenEleves = examen.eleves ? examen.eleves : {};
                Object.values(examenEleves).forEach(examenEleve => {
                    if (examenEleve.eleve === eleve && examenEleve.result && examenEleve.result === "Obtenu") totalReussitesPreInscriptions += 1;
                });
            });
        });
        if (this.getNbPreInscriptions() === 0) return 0;
        return parseInt(totalReussitesPreInscriptions/this.getNbPreInscriptions()*100, 10);
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Header dividing color="orange" content="Réussite" />
                <Grid>
                    <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                        <Statistic label="Nombre d'examens effectués par ses élèves" value={this.getNbTotalExamens()} />
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                        <Statistic label="% de réussite du moniteur" value={`${this.getReussite()}%`} />
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                        <Statistic label="Nombre de pré-inscriptions ayant passé un examen" value={this.getNbPreInscriptions()} />
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                        <Statistic label="% de réussite de pré-inscriptions" value={`${this.getReussitePreInscription()}%`} />
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
};

Reussite.propTypes = {
    id: PropType.string,
}

export default Reussite;