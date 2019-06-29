// React
import React, { Component } from 'react';
import { Segment, Header, Divider, Button, Message, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import SelectTypeRDV from '../components/selectTypeRDV.component';
import SearchEleve from '../components/searchEleve.component';
import SearchLieux from '../components/searchLieux.component';
import DisponibilitesEleve from '../components/disponibilitesEleve.component';
import SelectMoniteurs from '../components/selectMoniteurs.component';
import HeuresLibres from '../components/heuresLibres.component';

// action
import { addPlanning } from '../../../../actions/add.action';

class Placer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeRDV: "",
            coords: {},
            distance: 10,
            disponibilites: [],
            heuresChoisies: [],
            moniteurs: [],
            message: "",
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ loading: true });
        window.scrollTo(0, 0);
        addPlanning(
            this.state.typeRDV,
            this.props.eleve,
            this.state.coords,
            this.state.heuresChoisies
        ).then(() => {
            this.setState({
                loading: false,
                message: "Heures placées avec succès !",
                heuresChoisies: [],
            });
        }).catch(err => this.setState({ message: err.message, loading: false }));
    }

    render() {
        return (
            <Segment>
                <Grid divided columns={2}>
                    <Grid.Row>
                        <Grid.Column computer={4} mobile={16}>
                            <Header
                                textAlign='center'
                                content='Paramètres'
                            />
                            <SelectTypeRDV
                                handleChange={typeRDV => this.setState({ typeRDV })}
                                typeRDV={this.state.typeRDV}
                            />
                            <Divider />
                            <SearchEleve
                                handleChange={this.props.handleChangeEleve}
                                eleve={this.props.eleve}
                            />
                            <Divider />
                            <SearchLieux
                                handleChangeCoords={coords => this.setState({ coords })}
                                handleChangeDistance={distance => this.setState({ distance })}
                                coords={this.state.coords}
                                distance={this.state.distance}
                            />
                            <Divider />
                            <DisponibilitesEleve
                                handleChange={disponibilites => this.setState({ disponibilites })}
                                disponibilites={this.state.disponibilites}
                            />
                            <Divider />
                            <SelectMoniteurs
                                handleChange={moniteurs => this.setState({ moniteurs })}
                                moniteurs={this.state.moniteurs}
                            />
                        </Grid.Column>
                        <Grid.Column computer={12} mobile={16}>
                            <Header
                                textAlign='center'
                                content='Placer des heures'
                            />
                            <Message
                                info
                                icon="info"
                                header="Information"
                                content={this.state.message}
                                hidden={this.state.message.length === 0}
                            />
                            <HeuresLibres
                                typeRDV={this.state.typeRDV}
                                disponibilites={this.state.disponibilites}
                                eleve={this.props.eleve}
                                coords={this.state.coords}
                                distance={this.state.distance}
                                moniteurs={this.state.moniteurs}
                                heuresChoisies={this.state.heuresChoisies}
                                handleChange={heuresChoisies => this.setState({ heuresChoisies })}
                            />
                            <Divider />
                            <br />
                            <Button
                                fluid
                                icon='add'
                                positive={this.state.heuresChoisies.length !== 0}
                                disabled={this.state.heuresChoisies.length === 0}
                                content='Placer ces heures de conduite'
                                onClick={this.handleClick}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

Placer.propTypes = {
    eleve: PropTypes.string,
    handleChangeEleve: PropTypes.func,
};

export default Placer;
