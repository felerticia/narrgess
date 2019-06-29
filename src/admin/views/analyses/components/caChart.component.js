// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend } from 'recharts';

// actions
import { getBoutiques, getBoutiquesArchives, getEleves } from '../../../../actions/get.action';

const getVenteMontantTTC = (vente, boutique) => {
    const produit = boutique[vente.produit] ? boutique[vente.produit] : {};
    const prix = produit.prix ? produit.prix : 0.0;
    return vente.quantite*prix;
};

const getCA = (ventes, boutique, month, year) => {
    let ca = 0;
    const filteredVentes = ventes.filter(vente => parseInt(vente.date.split('/')[1], 10) === month && parseInt(vente.date.split('/')[2], 10) === year);
    filteredVentes.forEach(vente => ca += getVenteMontantTTC(vente, boutique));
    return Math.round(ca);
};

class CAChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
        };
    }

    UNSAFE_componentWillMount() {
        const data = [];
        getBoutiques().then(onlineBoutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const boutique = {...onlineBoutique, ...archivesBoutique};
                getEleves().then(eleves => {
                    const ventes = [];
                    Object.values(eleves).forEach(eleve => {
                        const compte = eleve.compte ? eleve.compte : {};
                        const ventesEleve = compte.ventes ? compte.ventes : {};
                        Object.values(ventesEleve).forEach(vente => ventes.push(vente));
                    });
                    const x = ["Jan.", "Fev.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Aout", "Sept.", "Oct.", "Nov.", "Dec."];
                    for (let month = 1; month <= 12; month += 1) {
                        data.push({
                            "Date": x[month-1],
                            "Cette année": getCA(ventes, boutique, month, new Date().getFullYear()),
                            "Il y a 1 an": getCA(ventes, boutique, month, new Date().getFullYear()-1),
                            "Il y a 2 ans": getCA(ventes, boutique, month, new Date().getFullYear()-2),
                        });
                    }
                    this.setState({ data, loading: false });
                });
            });
        });
    }

    render() {
        return (
            <Segment padded raised color='orange' loading={this.state.loading}>
                <Header content="Chiffre d'affaire sur 3 ans (HT)" textAlign="center" />
                <ResponsiveContainer width='100%' height={250}>
                    <BarChart data={this.state.data}>
                        <Bar dataKey="Il y a 2 ans" fill='#ffa500' />
                        <Bar dataKey="Il y a 1 an" fill='#82ca9d' />
                        <Bar dataKey="Cette année" fill='#8884d8' />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Date" />
                        <Tooltip />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </Segment>
        );
    }
}

export default CAChart;