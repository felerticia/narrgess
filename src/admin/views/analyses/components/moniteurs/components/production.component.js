// React
import React, { Component } from 'react';
import { Segment, Header, Statistic, Grid } from 'semantic-ui-react';
import PropType from 'prop-types';
import _ from 'lodash';

// actions
import { getEleves, getMoniteur } from '../../../../../../actions/get.action';

class Production extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moniteur: {},
            planning: [],
            estimations: [],
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
        this.getPlanningMoniteur = this.getPlanningMoniteur.bind(this);
        this.getCounterPerWeek = this.getCounterPerWeek.bind(this);
        this.getMeanHourPerWeek = this.getMeanHourPerWeek.bind(this);
        this.getPercProduction = this.getPercProduction.bind(this);
        this.getMeanEstimatedHours = this.getMeanEstimatedHours.bind(this);
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
        getEleves().then(eleves => {
            getMoniteur(id).then(moniteur => {
                const planningTotal = []; const estimationsTotal = [];
                Object.keys(eleves).forEach(eleveKey => {
                    const eleve = eleves[eleveKey];
                    const planning = eleve.planning ? eleve.planning : {};
                    Object.keys(planning).forEach(planningKey => {
                        if (new Date(planning[planningKey].date) < new Date()) {
                            planningTotal.push(planning[planningKey]);
                        }
                    });
                    const estimations = eleve.estimations ? eleve.estimations : {};
                    Object.values(estimations).forEach(estimation => {
                        if (estimation.moniteur === id) estimationsTotal.push(estimation.value);
                    });
                });
                this.setState({
                    moniteur,
                    planning: planningTotal,
                    estimations: estimationsTotal,
                    loading: false,
                });
            });
        });
    }

    getPlanningMoniteur() {
        return _.filter(this.state.planning, p => p.moniteur === this.props.id);
    }

    getCounterPerWeek() {
        const planningMoniteur = _.filter(this.getPlanningMoniteur(), p => new Date(p.date) <= new Date());
        const couterPerWeek = {};
        Object.values(planningMoniteur).forEach(hour => {
            const date = new Date(hour.date);
            date.setDate(date.getDate() - date.getDay());
            const keyCounter = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
            if (!couterPerWeek[keyCounter]) couterPerWeek[keyCounter] = 0;
            couterPerWeek[keyCounter] += 1;
        });
        return couterPerWeek;
    }

    getMeanHourPerWeek() {
        const couterPerWeek = this.getCounterPerWeek();
        const totalHours = Object.values(couterPerWeek).reduce((a, b) => a+b, 0);
        const nbWeeks = Object.keys(couterPerWeek).length;
        if (nbWeeks === 0) return 0.0;
        return parseInt(totalHours/nbWeeks*100, 10)/100;
    }

    getPercProduction() {
        if (this.state.planning.length === 0) return 0;
        const totalMoniteurHours = this.getPlanningMoniteur().length;
        return parseInt(totalMoniteurHours/this.state.planning.length*100, 10);
    }

    getMeanEstimatedHours() {
        if (this.state.estimations.length === 0) return 0;
        const totalEstimations = Object.values(this.state.estimations).reduce((a, b) => a+b, 0);
        return parseInt(totalEstimations/this.state.estimations.length*100, 10)/100;
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Header dividing color="orange" content="Prodution" />
                <Grid>
                    <Grid.Row textAlign="center">
                        <Grid.Column computer={6} tablet={6} mobile={16}>
                            <Statistic label="Heures par semaine en moyenne" value={this.getMeanHourPerWeek()} />
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <Statistic label="Heures réalisées" value={this.getPlanningMoniteur().length} />
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            <Statistic label="De la production globale" value={`${this.getPercProduction()} %`} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="center">
                        <Grid.Column computer={6} tablet={6} mobile={16}>
                            <Statistic label="Heures estimées en moyenne" value={this.getMeanEstimatedHours()} />
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            {/* % emploi du temps occupé */}
                            {/* <Statistic label="Emploi du temps occupé" value={`${this.getPercProduction()} %`} /> */}
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={16}>
                            {/* % indisponibilité */}
                            {/* <Statistic label="Emploi du temps occupé" value={`${this.getPercProduction()} %`} /> */}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
};

Production.propTypes = {
    id: PropType.string,
}

export default Production;