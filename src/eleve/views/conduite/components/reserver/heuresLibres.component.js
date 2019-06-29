// React
import React, { Component } from 'react';
import { Segment, Header, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Style
import Style from './heuresLibres.style';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { addPlanning } from '../../../../../actions/add.action';
import { getAvailableHours, getEleveNbHours } from '../../../../../actions/get.action';

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const months = ['Jan.', 'Fev.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

class HeuresLibres extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nbHeuresAutorisees: 0,
            heuresLibres: [],
            message: "",
            messageErr: false,
            loading: true,
        }

        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.coords, this.props.moniteur);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.heuresChoisies.length === nextProps.heuresChoisies.length) {
            this.fetchData(nextProps.coords, nextProps.moniteur);
        }
    }

    fetchData(coords, moniteur) {
        this.setState({ loading: true, heuresLibres: [] });
        if (coords === undefined || !Object.keys(coords) || Object.keys(coords).length === 0) this.setState({ loading: false, message: "Il faut un choisir un lieux de RDV", messageErr: true })
        else if (moniteur.length === 0) this.setState({ loading: false, message: "Il faut choisir un moniteur", messageErr: true });
        else {
            const eleve = getLoggedUser().uid;
            const typeRDV = "-LCkVGoOWzkn9hwCjHGk";
            const disponibilites = ["00", "01", "10", "11", "20", "21", "30", "31", "40", "41", "50", "51"];
            getEleveNbHours(eleve, typeRDV).then(({ nbHeures }) => {
                this.setState({ nbHeuresAutorisees: nbHeures });
                if (nbHeures > 0) {
                    getAvailableHours(typeRDV, eleve, coords, 10, disponibilites, [moniteur]).then(heuresLibres => {
                        this.setState({
                            heuresLibres, loading: false,
                            messageErr: Object.values(heuresLibres).length === 0,
                            message: Object.values(heuresLibres).length === 0 ? "Désolé, il n'y a pas de disponibilités pour les paramètres recherchés" : this.state.messageErr ? "" : this.state.message,
                        });
                    }).catch(err => this.setState({ loading: false, message: err.message, messageErr: true }));
                } else this.setState({ loading: false, message: "Malheureusement, tu ne peux pas placer d'heures :/", messageErr: true });
            }).catch(err => this.setState({ loading: false, message: err.message, messageErr: true }));
        }
    }

    handleClick(heureChoisie) {
        let heuresChoisies = this.props.heuresChoisies.slice(0);
        let message = "";
        if (!heuresChoisies.find(heure => heureChoisie.date === heure.date && heureChoisie.moniteurId === heure.moniteurId && heureChoisie.lieuxId === heure.lieuxId)) {
            let nbHeurePerDay = 0;
            let nbHeurePerWeek = 0;
            heuresChoisies.forEach(heure => {
                const date1 = new Date(heure.date);
                const date2 = new Date(heureChoisie.date);
                const monday1 = new Date(date1); monday1.setDate(date1.getDate() - date1.getDay() + 1);
                const monday2 = new Date(date2); monday2.setDate(date2.getDate() - date2.getDay() + 1);
                if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) {
                    nbHeurePerDay += 1;
                }
                if (monday1.getDate() === monday2.getDate() && monday1.getMonth() === monday2.getMonth() && monday1.getFullYear() === monday2.getFullYear()) {
                    nbHeurePerWeek += 1;
                }
            });
            if (nbHeurePerDay >= 2) message = "Tu ne peux pas placer plus de 2 heures par jour";
            else if (nbHeurePerWeek >= 3) message = "Tu ne peux pas placer plus de 3 heures par semaine";
            else if (heuresChoisies.length >= this.state.nbHeuresAutorisees) message = "Tu ne peux pas placer plus d'heures";
            else heuresChoisies.push(heureChoisie);
        } else {
            heuresChoisies.splice(heuresChoisies.indexOf(heureChoisie), 1);
        }
        if (message.length === 0) this.props.handleChange('heuresChoisies', heuresChoisies);
        this.setState({ message, messageErr: true });
    }

    handleSubmit() {
        this.setState({ loading: true });
        const eleve = getLoggedUser().uid;
        const typeRDV = "-LCkVGoOWzkn9hwCjHGk";
        addPlanning(typeRDV, eleve, this.props.coords, this.props.heuresChoisies).then(() => {
            this.setState({ loading: false, message: "Heures placées avec succès !", messageErr: false });
            this.props.handleChange("heuresChoisies", []);
            this.fetchData(this.props.coords, this.props.moniteur);
        }).catch(err => this.setState({ message: err.message, messageErr: true, loading: false }));
    }

    render() {
        const dimmed = this.props.coords === undefined || !Object.keys(this.props.coords) || Object.keys(this.props.coords).length === 0 || this.props.moniteur.length === 0;
        if (dimmed) return null;
        return (
            <Segment raised color="orange" loading={this.state.loading}>
                {
                    this.state.message.length !== 0 &&
                    <Message
                        icon={this.state.messageErr ? 'warning': 'check'}
                        warning={this.state.messageErr}
                        positive={!this.state.messageErr}
                        content={this.state.message}
                        hidden={this.state.message.length === 0}
                    />
                }
                <Header content="Heures disponibles" textAlign="center" />
                <div style={Style.grid}>
                {
                    Object.keys(this.state.heuresLibres).length !== 0 &&
                    _.sortBy(Object.keys(this.state.heuresLibres, dateKey => (new Date(dateKey)).getTime())).map(dateKey => {
                        const date = new Date(dateKey);
                        const day = days[date.getDay() - 1];
                        const dayNumber = date.getDate();
                        const month = months[date.getMonth()];
                        return (
                            <div key={dateKey} style={Style.bigColumnContainer}>
                                <Segment clearing><Header as='h4' textAlign='center'>{day} {dayNumber} {month}</Header></Segment>
                                <div style={Style.bigColumn}>
                                {
                                    this.state.heuresLibres[dateKey].length !== 0 &&
                                    <div style={Style.column}>
                                    {
                                        this.state.heuresLibres[dateKey].map((availability, key) => {
                                            const start = new Date(availability.date).getHours();
                                            const hourStart = `${start}h30`;
                                            const hourEnd = `${start+1}h30`;
                                            return (
                                                <div key={key}>
                                                    <Button
                                                        fluid inverted compact
                                                        color='orange'
                                                        active={this.props.heuresChoisies.find(heure => availability.date === heure.date && availability.moniteurId === heure.moniteurId && availability.lieuxId === heure.lieuxId ? true : false)}
                                                        onClick={() => this.handleClick(availability)}
                                                    >
                                                        {hourStart} - {hourEnd}
                                                    </Button>
                                                    <br />
                                                </div>
                                            );
                                        })
                                    }
                                    </div>
                                }
                            </div>
                        </div>
                        );
                    })
                }
                </div>
                <br />
                <Button
                    fluid icon='add'
                    positive={this.props.heuresChoisies.length !== 0}
                    disabled={this.props.heuresChoisies.length === 0}
                    content='Placer ces heures de conduite'
                    onClick={this.handleSubmit}
                />
            </Segment>
        );
    }
}

HeuresLibres.propTypes = {
    coords: PropTypes.object,
    moniteur: PropTypes.string,
    heuresChoisies: PropTypes.array,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default HeuresLibres;
