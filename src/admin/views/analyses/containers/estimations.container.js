// React
import React, { Component } from 'react';
import { Segment, Header, Grid, Label, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import List from '../components/list.component';

// actions
import { getEleves, getMoniteurs, getMoniteursArchives } from '../../../../actions/get.action';

class Estimations extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            mean_estimation: 0,
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({ loading: true });
        getEleves().then(eleves => {
            getMoniteurs().then(moniteurs => {
                getMoniteursArchives().then(archives => {
                    const data = []; let total = 0; let counter = 0;
                    Object.values(eleves).forEach(eleve => {
                        const estimations = eleve.estimations ? eleve.estimations : {};
                        const dossier = eleve.dossier ? eleve.dossier : {};
                        const eleve_data = dossier.eleve ? dossier.eleve : {};
                        const nomEleve = eleve_data ? `${eleve_data.nom} ${eleve_data.prenom}` : "";
                        Object.values(estimations).forEach(estimation => {
                            counter += 1; total += estimation.value;
                            const moniteur = moniteurs[estimation.moniteur] ? moniteurs[estimation.moniteur] : archives[estimation.moniteur] ? archives[estimation.moniteur] : {};
                            data.push({
                                "Eleve": nomEleve,
                                "Moniteur": `${moniteur.nom} ${moniteur.prenom}`,
                                "Estimation d'heures": estimation.value,
                            });
                        });
                    });
                    this.setState({
                        data,
                        mean_estimation: counter > 0 ? 1.0*total/counter : 0,
                        loading: false,
                    });
                });
            });
        });
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loading}>
                <Label
                    as='a'
                    size='large'
                    icon='arrow left'
                    attached='top left'
                    onClick={() => this.props.history.push('/admin/analyses')}
                />
                <Header as='h2' textAlign='center'>Estimations d'heures supplémentaires</Header>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign='center' computer={16} largeScreen={16} tablet={16} widescreen={16} mobile={16}>
                                <Statistic>
                                    <Statistic.Value>{Math.round(this.state.mean_estimation*100)/100}</Statistic.Value>
                                    <Statistic.Label>Heures estimées en moyenne</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <List data={this.state.data} />
                </Segment>
            </Segment>
        );
    }
};

Estimations.propTypes = {
    history: PropTypes.object,
};

export default Estimations;
