// React
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';

// Local
import Agenda from '../components/agenda.component';
import SuiviPedagogique from '../components/suiviPedagogique.component';
import EvaluationMoniteur from '../components/evaluationMoniteur.component';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getEleve } from '../../../../actions/get.action';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eleve: {},
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { uid } = getLoggedUser();
        this.setState({ loading: true });
        getEleve(uid).then(eleve => this.setState({ eleve, loading: false, }));
    }

    render() {
        return (
            <Segment basic>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column computer={6} tablet={16}>
                        <Agenda
                            eleve={this.state.eleve}
                            loading={this.state.loading}
                            fetchData={this.fetchData}
                        />
                        <br />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={16}>
                        <SuiviPedagogique
                            eleve={this.state.eleve}
                            loading={this.state.loading}
                        />
                        <br />
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={16}>
                        <EvaluationMoniteur
                            eleve={this.state.eleve}
                            loading={this.state.loading}
                            fetchData={this.fetchData}
                        />
                        <br />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        );
    }
}

export default Home;
