// React
import React, { Component } from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import List from '../components/list.component';

// actions
import { getLieuxRDV, getBoutiques, getBoutiquesArchives, getEleves } from '../../../../actions/get.action';

const getTotalCours = (lieux, cours) => cours.filter(cour => cour.lieuxRDV === lieux).length;

const getTotalCA = (ventes, boutique) => {
    let total = 0;
    ventes.forEach(vente => {
        const produit_id = vente.produit ? vente.produit : "";
        const produit = boutique[produit_id] ? boutique[produit_id] : {};
        const prix = produit.prix ? produit.prix : 0;
        const quantite = vente.quantite ? vente.quantite : 0;
        total += prix*quantite;
    });
    return total;
};

const getTotalHeures = (ventes, boutique) => {
    let total_heures = 0;
    Object.values(ventes).forEach(vente => {
        const produit = boutique[vente.produit];
        const quantite = vente.quantite ? vente.quantite : 0;
        const heure_ajout = produit.heureAjout ? produit.heureAjout : {};
        Object.values(heure_ajout).forEach(nb => total_heures += quantite*nb);
    });
    return total_heures;
};

const getCA = (lieux, eleves, from, to, boutique) => {
    let ca = 0;
    Object.values(eleves).forEach(eleve => {
        const compte = eleve.compte ? eleve.compte : {};
        const ventes = compte.ventes ? Object.values(compte.ventes) : [];
        const planning = eleve.planning ? eleve.planning : {};
        const cours = _.filter(Object.values(planning), pl => {
            if (from && to) {
                if (moment(pl.date) >= from && moment(pl.date) <= to) return true;
                return false;
            } else return true;
        });
        const total_cours = getTotalCours(lieux, cours);
        const total_heures = getTotalHeures(ventes, boutique);
        const total_ca = getTotalCA(ventes, boutique);
        ca += total_heures === 0 ? 0 : total_ca*total_cours/total_heures;
    });
    return ca;
};

const sortFunc = data => data["Nombre de cours (total)"];

class LieuxRDV extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            loading: true,
            startDate: null,
            endDate: null,
            focusedInput: null,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData(from, to) {
        this.setState({ loading: true });
        getLieuxRDV().then(lieuxRDV => {
            getBoutiques().then(onlineBoutique => {
                getBoutiquesArchives().then(archivesBoutique => {
                    const boutique = {...onlineBoutique, ...archivesBoutique};
                    getEleves().then(eleves => {
                        const cours = []; let data = [];
                        Object.values(eleves).forEach(eleve => {
                            const planning = eleve.planning ? eleve.planning : {};
                            Object.values(planning).forEach(pl => {
                                if (from && to) {
                                    if (moment(pl.date) >= from && moment(pl.date) <= to) cours.push(pl);
                                } else cours.push(pl);
                            });
                        });
                        Object.keys(lieuxRDV).forEach(key => data.push({
                            "Lieux de RDV": lieuxRDV[key].nom,
                            "Nombre de cours (total)": getTotalCours(key, cours),
                            "Chiffre d'affaire": `${Math.round(getCA(key, eleves, from, to, boutique))} €`,
                        }));
                        data = _.orderBy(data, sortFunc, ["desc"]);
                        this.setState({
                            data,
                            loading: false,
                        });
                    });
                });
            });
        });
    }

    handleDateChange({ startDate, endDate }) {
        this.fetchData(startDate, endDate);
        this.setState({ startDate, endDate });
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
                <Header as='h2' textAlign='center'>Lieux de RDV</Header>
                <Segment raised>
                    <Header as='h4'>Filtres Dates</Header>
                    <DateRangePicker
                        block
                        isDayBlocked={() => false}
                        isOutsideRange={() => false}
                        startDate={this.state.startDate}
                        startDateId={this.state.startDate ? this.state.startDate.toString() : ""}
                        endDate={this.state.endDate}
                        endDateId={this.state.endDate ? this.state.endDate.toString() : ""}
                        onDatesChange={this.handleDateChange}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                        startDatePlaceholderText="De :"
                        endDatePlaceholderText="A :"
                    />
                </Segment>
                <Segment>
                    <List data={this.state.data} />
                </Segment>
            </Segment>
        );
    }
};

LieuxRDV.propTypes = {
    history: PropTypes.object,
};

export default LieuxRDV;
