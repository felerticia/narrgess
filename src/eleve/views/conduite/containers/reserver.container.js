// React
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';

// Local
import Header from '../components/reserver/header.component';
import ChoixLieux from '../components/reserver/choixLieux.component';
import ChoixMoniteur from '../components/reserver/choixMoniteur.component';
import HeuresLibres from '../components/reserver/heuresLibres.component';

class Reserver extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lieux: "",
            coords: {},
            moniteur: "",
            heuresChoisies: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, val) {
        const newState = {};
        newState[key] = val;
        this.setState(newState);
    }

    render() {
        return (
            <Segment basic>
                <Header heuresChoisies={this.state.heuresChoisies} />
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={8} tablet={16}>
                            <ChoixLieux
                                lieux={this.state.lieux}
                                coords={this.state.coords}
                                handleChange={this.handleChange}
                            />
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16}>
                            <ChoixMoniteur
                                coords={this.state.coords}
                                moniteur={this.state.moniteur}
                                handleChange={this.handleChange}
                            />
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={16} tablet={16}>
                            <HeuresLibres
                                coords={this.state.coords}
                                moniteur={this.state.moniteur}
                                heuresChoisies={this.state.heuresChoisies}
                                handleChange={this.handleChange}
                            />
                            <br />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default Reserver;