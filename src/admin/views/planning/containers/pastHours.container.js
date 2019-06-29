// React
import React, { Component } from 'react';
import { Segment, Header, Form, Grid, Dropdown, Button, Message } from 'semantic-ui-react';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker';
import _ from 'lodash';

// actions
import { getTypesRDV, getEleveNbHours, getEleves, getMoniteurs, getMoniteursArchives, getLieuxRDV } from '../../../../actions/get.action';
import { addElevePlanning } from '../../../../actions/add.action';

class PastHours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeRDV: "",
            eleve: "",
            moniteur: "",
            lieuxRDV: "",
            date: null,
            dateFocused: false,
            time: "",
            allTypesRDV: {},
            allEleves: {},
            allMoniteurs: {},
            allLieuxRDV: {},
            loadingTypesRDV: true,
            loadingEleves: true,
            loadingMoniteurs: true,
            loadingLieuxRDV: true,
            message: "",
            messageSuccess: false,
            loading: false,
        };

        this.filterLieuxRDV = this.filterLieuxRDV.bind(this);
        this.getError = this.getError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        getTypesRDV().then(allTypesRDV => this.setState({ allTypesRDV, loadingTypesRDV: false }));
        getEleves().then(allEleves => this.setState({ allEleves, loadingEleves: false }));
        getLieuxRDV().then(allLieuxRDV => this.setState({ allLieuxRDV, loadingLieuxRDV: false }));
        getMoniteurs().then(allMoniteurs => {
            getMoniteursArchives().then(archives => {
                this.setState({ allMoniteurs: {...allMoniteurs, ...archives}, loadingMoniteurs: false });
            });
        });
    }

    filterLieuxRDV(key) {
        if (this.state.moniteur === "") return true;
        const listMoniteurs = [];
        const lieuxRDV = this.state.allLieuxRDV[key];
        const lieuxRDV_moniteurs = lieuxRDV.moniteurs ? lieuxRDV.moniteurs : {};
        Object.values(lieuxRDV_moniteurs).forEach(lieuxRDV_moniteurs_data => listMoniteurs.push(lieuxRDV_moniteurs_data.moniteur));
        return listMoniteurs.find(o => o === this.state.moniteur);
    }

    getError() {
        return (
            this.state.typeRDV.length === 0 ||
            this.state.eleve.length === 0 ||
            this.state.moniteur.length === 0 ||
            this.state.lieuxRDV.length === 0 ||
            this.state.date === null ||
            this.state.date === undefined ||
            this.state.time.length === 0
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const date = new Date(this.state.date);
        const hour = parseInt(this.state.time.split(":")[0], 10);
        const minute = parseInt(this.state.time.split(":")[1], 10);
        date.setHours(hour); date.setMinutes(minute);
        getEleveNbHours(this.state.eleve, this.state.typeRDV).then(({ nbHeures }) => {
            if (nbHeures > 0) {
                addElevePlanning(this.state.eleve, {
                    date: date.toString().substring(0, 24),
                    lieuxRDV: this.state.lieuxRDV,
                    moniteur: this.state.moniteur,
                    typeRDV: this.state.typeRDV,
                }).then(() => {
                    this.setState({
                        typeRDV: "", eleve: "", lieuxRDV: "", moniteur: "", date: null, dateFocused: false, time: "",
                        message: "Heure placée avec succès !",
                        messageSuccess: true,
                        loading: false,
                    });
                }).catch(err => {
                    this.setState({
                        message: err.message,
                        messageSuccess: false,
                        loading: false,
                    });
                });
            } else {
                this.setState({
                    message: "Cet élève ne peut pas placer d'heures",
                    messageSuccess: false,
                    loading: false,
                });
            }
        });
    }

    render() {
        return (
            <Segment padded loading={this.state.loading || this.state.loadingTypesRDV || this.state.loadingEleves || this.state.loadingMoniteurs || this.state.loadingLieuxRDV}>
                <Message
                    hidden={this.state.message.length === 0}
                    content={this.state.message}
                    error={!this.state.messageSuccess}
                    success={this.state.messageSuccess}
                />
                <Header as="h2" content="Ajouter des heures passées" textAlign="center" />
                <Form>
                    <Form.Field>
                        <Header>Type de RDV :</Header>
                        <Dropdown
                            fluid selection search
                            value={this.state.typeRDV}
                            loading={this.state.loadingTypesRDV}
                            onChange={(_, { value }) => this.setState({ typeRDV: value })}
                            options={Object.keys(this.state.allTypesRDV).map(key => ({
                                key,
                                value: key,
                                text: this.state.allTypesRDV[key].nom,
                            }))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Header>Eleve :</Header>
                        <Dropdown
                            fluid selection search
                            value={this.state.eleve}
                            loading={this.state.loadingEleves}
                            onChange={(_, { value }) => this.setState({ eleve: value })}
                            options={Object.keys(this.state.allEleves).map(key => ({
                                key,
                                value: key,
                                text: `${this.state.allEleves[key].dossier.eleve.nom} ${this.state.allEleves[key].dossier.eleve.prenom}`,
                            }))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Header>Moniteur :</Header>
                        <Dropdown
                            fluid selection search
                            value={this.state.moniteur}
                            loading={this.state.loadingMoniteurs}
                            onChange={(_, { value }) => this.setState({ moniteur: value })}
                            options={Object.keys(this.state.allMoniteurs).map(key => ({
                                key,
                                value: key,
                                text: `${this.state.allMoniteurs[key].nom} ${this.state.allMoniteurs[key].prenom}`,
                            }))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Header>Lieux de RDV :</Header>
                        <Dropdown
                            fluid selection search
                            value={this.state.lieuxRDV}
                            loading={this.state.loadingLieuxRDV}
                            onChange={(_, { value }) => this.setState({ lieuxRDV: value })}
                            options={_.filter(Object.keys(this.state.allLieuxRDV), this.filterLieuxRDV).map(key => ({
                                key,
                                value: key,
                                text: this.state.allLieuxRDV[key].nom,
                            }))}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Header>Date & Heure :</Header>
                        <Grid centered textAlign='center' verticalAlign='middle' columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <SingleDatePicker
                                        block
                                        isDayBlocked={date => new Date() < date}
                                        isOutsideRange={() => false}
                                        date={this.state.date}
                                        id={this.state.date ? this.state.date.toString() : ""}
                                        onDateChange={date => this.setState({ date })}
                                        focused={this.state.dateFocused}
                                        onFocusChange={({ focused }) => this.setState({ dateFocused: focused })}
                                        placeholder="Le :"
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <TimePicker
                                        value={this.state.time}
                                        onChange={time => this.setState({ time })}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form.Field>
                </Form>
                <br />
                <Button
                    fluid
                    positive={!this.getError()}
                    disabled={this.getError()}
                    icon="add"
                    content="Ajouter"
                    onClick={this.handleSubmit}
                />
            </Segment>
        );
    }
}

export default PastHours;
