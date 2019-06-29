// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

// actions
import { getLieuxRDV, getBoutiques, getBoutiquesArchives, getEleves } from '../../../../actions/get.action';

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

const getCA = (month, year, lieux, eleves, boutique) => {
    let ca = 0;
    Object.values(eleves).forEach(eleve => {
        const compte = eleve.compte ? eleve.compte : {};
        const ventes = compte.ventes ? Object.values(compte.ventes) : [];
        const planning = eleve.planning ? eleve.planning : {};
        const planning_filtered = _.filter(planning, p => p.lieuxRDV === lieux && new Date(p.date).getMonth() === month && new Date(p.date).getFullYear() === year);
        const total_cours = planning_filtered.length;
        const total_heures = getTotalHeures(ventes, boutique);
        const total_ca = getTotalCA(ventes, boutique);
        ca += total_heures === 0 ? 0 : total_ca*total_cours/total_heures;
    });
    return ca;
};

class LieuxChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            lieuxRDV: {},
            loading: true,
        };
    }

    UNSAFE_componentWillMount() {
        const data = [];
        const months = ["Jan.", "Fev.", "Mar.", "Avr.", "Mai", "Juin", "Juil.", "Aou.", "Sep.", "Oct.", "Nov.", "Dec."];
        getLieuxRDV().then(lieuxRDV => {
            getBoutiques().then(onlineBoutique => {
                getBoutiquesArchives().then(archivesBoutique => {
                    const boutique = {...onlineBoutique, ...archivesBoutique};
                    getEleves().then(eleves => {
                        for (let i = -11; i <= 0; i += 1) {
                            const month = (new Date().getMonth() + i) < 0 ? 12 + (new Date().getMonth() + i) : (new Date().getMonth() + i);
                            const year = new Date().getFullYear() - (new Date().getMonth() - month < 0 ? 1 : 0);
                            const dataObject = {};
                            dataObject["Mois"] = `${months[month]} ${year}`;
                            Object.keys(lieuxRDV).forEach(lieux => dataObject[lieuxRDV[lieux].nom] = parseInt(getCA(month, year, lieux, eleves, boutique), 10));
                            data.push(dataObject);
                        }
                        this.setState({ data, lieuxRDV, loading: false });
                    });
                });
            });
        });
    }

    render() {
        const strokeColors = ["#DA4453", "#F6BB42", "#37BC9B", "#4A89DC", "#D770AD", "#AAB2BD", "#E9573F", "#8CC152", "#3BAFDA", "#967ADC"];
        return (
            <Segment padded raised color='orange' loading={this.state.loading}>
                <Header content="Chiffre d'affaire par lieux de RDV" textAlign="center" />
                <ResponsiveContainer width='100%' height={250}>
                    <LineChart data={this.state.data}>
                        <Legend />
                        <YAxis/>
                        <Tooltip/>
                        <XAxis dataKey="Mois"/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        {
                            Object.values(this.state.lieuxRDV).map((lieux, index) => (
                                <Line
                                    key={index}
                                    type='monotone'
                                    dataKey={lieux.nom}
                                    stroke={strokeColors[index%strokeColors.length]}
                                />
                            ))
                        }
                    </LineChart>
                </ResponsiveContainer>
            </Segment>
        );
    }
}

export default LieuxChart;