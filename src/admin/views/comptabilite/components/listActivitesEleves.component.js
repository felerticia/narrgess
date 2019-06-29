// React
import React, { Component } from 'react';
import { Segment, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import List from './list.component';

// actions
import { getBoutiques, getBoutiquesArchives, getEleves } from '../../../../actions/get.action';

const getTotal = heures => {
    let res = 0;
    Object.values(heures).forEach(val => res += val);
    return res;
};

const getTotalVentes = (ventes, boutique) => {
    let totalVentes = 0;
    Object.values(ventes).forEach(vente => {
        const { produit, quantite } = vente;
        const prix = boutique[produit].prix ? boutique[produit].prix : 0;
        totalVentes += prix * quantite;
    });
    return totalVentes;
};

const getTotalEIR = EIR => {
    let total = 0;
    Object.values(EIR).forEach(eir => {
        const { montant } = eir;
        total += montant;
    });
    return total;
};

class ListActivitesEleves extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            payload: "",
            data: [],
        };

        this.filter = this.filter.bind(this);
        this.getCSVHeaders = this.getCSVHeaders.bind(this);
        this.getCSVData = this.getCSVData.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(onlineBoutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const boutique = {...onlineBoutique, ...archivesBoutique};
                getEleves().then(eleves => {
                    let data = [];
                    Object.values(eleves).forEach(eleve => {
                        const dossier = eleve.dossier ? eleve.dossier : {};
                        const { nom, prenom } = dossier.eleve;
                        const planning = eleve.planning ? eleve.planning : {};
                        const compte = eleve.compte ? eleve.compte : {};
                        const reste = compte.heures ? getTotal(compte.heures) : 0;
                        const realisees = Object.values(planning).length + compte.penalty ? getTotal(compte.penalty) : 0;
                        const ventes = getTotalVentes(compte.ventes ? compte.ventes : {}, boutique);
                        const encaissements = getTotalEIR(compte.encaissements ? compte.encaissements : {});
                        const impayes = getTotalEIR(compte.impayes ? compte.impayes : {});
                        const remboursements = getTotalEIR(compte.remboursements ? compte.remboursements : {});
                        data.push({
                            eleve: `${nom} ${prenom}`,
                            realisees, reste,
                            total: realisees + reste,
                            apayer: parseInt((ventes - encaissements + impayes + remboursements)*100, 10)/100,
                        });
                    });
                    this.setState({ data, loading: false });
                });
            });
        });
    }

    filter(eleve) {
        const { payload } = this.state;
        if (payload.length < 1) return true;
        const regExp = new RegExp(_.escapeRegExp(payload), 'i');
        return regExp.test(eleve.eleve);
    }

    getCSVHeaders() {
        return ([
            { label: "Eleve", key: "eleve" },
            { label: "Heures achetées", key: "total" },
            { label: "Heures réalisées", key: "realisees" },
            { label: "Heures restantes", key: "reste" },
            { label: "Reste à payer", key: "apayer" },
        ]);
    }

    getCSVData() {
        return _.orderBy(_.filter(this.state.data, this.filter), ["eleve"], ["asc"]);
    }

    render() {
        const headers = this.getCSVHeaders();
        const data = this.getCSVData();
        return (
            <Segment basic loading={this.state.loading}>
                <Input
                    fluid
                    placeholder="Rechercher ..."
                    value={this.state.payload}
                    onChange={(_, { value }) => this.setState({ payload: value })}
                />
                <br />
                <List
                    data={data}
                    headers={headers}
                    csvName="activites-eleves.csv"
                />
            </Segment>
        );
    }
}

ListActivitesEleves.propTypes = {
    match: PropTypes.object,
};

export default ListActivitesEleves;