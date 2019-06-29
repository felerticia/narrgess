// React
import React, { Component } from 'react';
import { Segment, Header, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Style
import Style from '../styles/heuresLibres.style';

// actions
import { getEleveNbHours, getAvailableHours } from '../../../../actions/get.action';

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const months = ['Jan.', 'Fev.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

class HeuresLibres extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nbHeuresAutorisees: 0,
            heuresLibres: [],
            errorMsg: "",
            loading: true,
        }

        this.fetchData = _.debounce(this.fetchData, 500).bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.typeRDV, this.props.eleve, this.props.coords, this.props.distance, this.props.disponibilites, this.props.moniteurs);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.heuresChoisies.length === nextProps.heuresChoisies.length) {
            this.fetchData(nextProps.typeRDV, nextProps.eleve, nextProps.coords, nextProps.distance, nextProps.disponibilites, nextProps.moniteurs);
        }
    }

    fetchData(typeRDV, eleve, coords, distance, disponibilites, moniteursRequested) {
        this.setState({ loading: true, errorMsg: "", heuresLibres: [] });
        if (typeRDV.length === 0) this.setState({ loading: false, errorMsg: "Il faut choisir un type de RDV" });
        else if (eleve.length === 0) this.setState({ loading: false, errorMsg: "Il faut choisir un élève" });
        else if (coords === undefined || !Object.keys(coords) || Object.keys(coords).length === 0) this.setState({ loading: false, errorMsg: "Il faut un lieux pour le lieux de RDV" });
        else if (disponibilites.length === 0) this.setState({ loading: false, errorMsg: "Il faut choisir des disponibilités" });
        else {
            getEleveNbHours(eleve, typeRDV).then(({ nbHeures }) => {
                if (nbHeures > 0) {
                    getAvailableHours(typeRDV, eleve, coords, distance, disponibilites, moniteursRequested).then(heuresLibres => {
                        if (Object.values(heuresLibres).length !== 0) this.setState({ heuresLibres, nbHeuresAutorisees: nbHeures, loading: false });
                        else this.setState({ nbHeuresAutorisees: nbHeures, errorMsg: "Désolé, il n'y a pas de disponibilités pour les paramètres recherchés", loading: false });
                    }).catch(err => this.setState({ loading: false, nbHeuresAutorisees: nbHeures, errorMsg: err.message }));
                } else this.setState({ loading: false, nbHeuresAutorisees: nbHeures, errorMsg: "Cet élève ne peut pas placer d'heures" });
            }).catch(err => this.setState({ loading: false, errorMsg: err.message }));
        }
    }

    handleClick(heureChoisie) {
        let heuresChoisies = this.props.heuresChoisies.slice(0);
        let errorMsg = "";
        if (!heuresChoisies.find(heure => heureChoisie.date === heure.date && heureChoisie.moniteurId === heure.moniteurId && heureChoisie.lieuxId === heure.lieuxId)) {
            let nbHeure = 0;
            heuresChoisies.forEach(heure => {
                const date1 = new Date(heure.date);
                const date2 = new Date(heureChoisie.date);
                if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear())
                    nbHeure += 1;
            });
            if (nbHeure >= 2) errorMsg = "Vous ne pouvez pas placer plus de deux heures par jour";
            else if (heuresChoisies.length >= this.state.nbHeuresAutorisees) errorMsg = "On ne peut pas placer plus d'heure pour cet élève";
            else heuresChoisies.push(heureChoisie);
        } else {
            heuresChoisies.splice(heuresChoisies.indexOf(heureChoisie), 1);
        }
        if (errorMsg.length === 0) this.props.handleChange(heuresChoisies);
        this.setState({ errorMsg });
    }

    render() {
        const moniteurs = [];
        Object.keys(this.state.heuresLibres).forEach(dateKey => {
            this.state.heuresLibres[dateKey].forEach(availability => {
                const moniteur = availability.moniteurName;
                if (!moniteurs.find(m => m === moniteur)) moniteurs.push(moniteur);
            });
        });
        return (
            <Segment raised loading={this.state.loading}>
                {
                    this.props.typeRDV.length !==0 &&
                    this.props.eleve.length !==0 &&
                    this.props.coords !== undefined && Object.keys(this.props.coords) && Object.keys(this.props.coords).length !== 0 &&
                    this.props.disponibilites.length !== 0 &&
                    <b>Cet élève peut placer : {this.state.nbHeuresAutorisees} heures</b>
                }
                <Message
                    warning
                    icon='warning'
                    content={this.state.errorMsg}
                    hidden={this.state.errorMsg.length === 0}
                />
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
                                    _.sortBy(moniteurs, val => val).map(moniteurName => {
                                        const sortedHours =  _.filter(this.state.heuresLibres[dateKey], ['moniteurName', moniteurName]);
                                        return sortedHours.length !== 0 && (
                                            <div style={Style.column} key={moniteurName}>
                                                <Header as='h5' textAlign='center'>{moniteurName}</Header>
                                                {
                                                   sortedHours.map((availability, key) => {
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
                                                                    {hourStart} - {hourEnd}<br />
                                                                    {availability.moniteurName}
                                                                </Button>
                                                                <br />
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        );
                    })
                }
                </div>
            </Segment>
        );
    }
}

HeuresLibres.propTypes = {
    typeRDV: PropTypes.string,
    eleve: PropTypes.string,
    coords: PropTypes.object,
    distance: PropTypes.number,
    moniteurs: PropTypes.array,
    handleChange: PropTypes.func,
    disponibilites: PropTypes.array,
    heuresChoisies: PropTypes.array,
};

export default HeuresLibres;
