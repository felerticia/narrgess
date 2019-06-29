// React
import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import Filter from './filter.component';
import List from './list.component';

// actions
import { getPDFFacture, getBoutiques, getBoutiquesArchives, getEleves } from '../../../../actions/get.action';
import { convert2pdf } from '../../../../actions/convert.action';

const DMYStringToDate = DMY => {
    const DMY_array = DMY.split("/");
    return new Date(`${DMY_array[2]}-${DMY_array[1]}-${DMY_array[0]}`);
};

const TTC2HT = (ttc, tva) => ttc/(1+tva/100);

const round2numbers = number => Math.round(number * 100.0) / 100.0;

const getFactureMontantTTC = (facture, boutique, tva_filter) => {
    if (!tva_filter)
        return facture.vente.quantite*facture.produit.prix;
    if (facture.produit.type === "Prestation") {
        if (facture.produit.tva === tva_filter)
            return facture.vente.quantite*facture.produit.prix;
        return 0.0;
    } else {
        let ttc = 0;
        let total_ttc = 0;
        const forfait_ttc = facture.vente.quantite*facture.produit.prix;
        const prestations = facture.produit.prestations ? facture.produit.prestations : {};
        Object.keys(prestations).forEach(key => {
            total_ttc += facture.vente.quantite*boutique[key].prix*prestations[key];
            if (boutique[key].tva === tva_filter)
                ttc += facture.vente.quantite*boutique[key].prix*prestations[key];
        });
        if (total_ttc > 0) ttc = ttc*forfait_ttc/total_ttc;
        return ttc;
    }
};

const getFactureBaseHT = (facture, boutique, tva_filter) => {
    if (!tva_filter)
        return getFactureBaseHT(facture, boutique, 20) + getFactureBaseHT(facture, boutique, 5.5)
    return TTC2HT(getFactureMontantTTC(facture, boutique, tva_filter), tva_filter);
};

const getFactureMontantTVA = (facture, boutique, tva_filter) => {
    if (!tva_filter)
        return getFactureMontantTVA(facture, boutique, 20) + getFactureMontantTVA(facture, boutique, 5.5);
    return getFactureMontantTTC(facture, boutique, tva_filter) - getFactureBaseHT(facture, boutique, tva_filter);
};

class ListFactures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loadingFacture: false,
            data: [],
            boutique: {},
        }

        this.filter = this.filter.bind(this);
        this.getCSVHeaders = this.getCSVHeaders.bind(this);
        this.getCSVData = this.getCSVData.bind(this);
        this.handleDownloadFacture = this.handleDownloadFacture.bind(this);
        this.handleDownloadAllFactures = this.handleDownloadAllFactures.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(onlineBoutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const boutique = {...onlineBoutique, ...archivesBoutique};
                getEleves().then(eleves => {
                    let data = [];
                    Object.values(eleves).forEach(eleve => {
                        const compte = eleve.compte ? eleve.compte : {};
                        const ventes = compte.ventes ? compte.ventes : {};
                        Object.values(ventes).forEach(vente => {
                            const produit = boutique[vente.produit] ? boutique[vente.produit] : {};
                            data.push({
                                eleve,
                                vente,
                                produit,
                            });
                        });
                    });
                    this.setState({ data, boutique, loading: false });
                });
            });
        });
    }

    filter(data) {
        const { from, to } = this.props.match.params;
        if (from && to) {
            const fromDate = moment(from).toDate();
            const toDate = moment(to).toDate();
            toDate.setHours(0); toDate.setMinutes(0); toDate.setSeconds(0);
            const date = moment(data.vente.date, "DD/MM/YYYY").toDate();
            return date >= fromDate && date <= toDate;
        }
        return true;
    }

    getCSVHeaders() {
        return ([
            { label: "Numéro de facture", key: "id" },
            { label: "Date", key: "date" },
            { label: "Eleve", key: "eleve" },
            { label: "Base HT (20%)", key: "baseHT20" },
            { label: "Montant TVA (20%)", key: "montantTVA20" },
            { label: "Base HT (5.5%)", key: "baseHT55" },
            { label: "Montant TVA (5.5%)", key: "montantTVA55" },
            { label: "Base HT", key: "baseHT" },
            { label: "Montant TVA", key: "montantTVA" },
            { label: "Montant TTC", key: "montantTTC" },
            { label: "Facture", key: "action" }
        ]);
    }

    getCSVData() {
        return _.orderBy(_.filter(this.state.data, this.filter), facture => DMYStringToDate(facture.vente.date), ["desc"]).map(facture => ({
            id: facture.vente.factureId,
            date: facture.vente.date,
            eleve: `${facture.eleve.dossier.eleve.nom} ${facture.eleve.dossier.eleve.prenom}`,
            baseHT: round2numbers(getFactureBaseHT(facture, this.state.boutique)),
            baseHT20: round2numbers(getFactureBaseHT(facture, this.state.boutique, 20)),
            baseHT55: round2numbers(getFactureBaseHT(facture, this.state.boutique, 5.5)),
            montantTVA: round2numbers(getFactureMontantTVA(facture, this.state.boutique)),
            montantTVA20: round2numbers(getFactureMontantTVA(facture, this.state.boutique, 20)),
            montantTVA55: round2numbers(getFactureMontantTVA(facture, this.state.boutique, 5.5)),
            montantTTC: round2numbers(getFactureMontantTTC(facture)),
            action: (
                <Button
                    primary circular
                    loading={this.state.loadingFacture === facture.vente.factureId}
                    icon="file"
                    onClick={() => this.handleDownloadFacture(facture)}
                />
            ),
        }));
    }

    handleDownloadFacture(facture) {
        this.setState({ loadingFacture: facture.vente.factureId });
        getPDFFacture(facture).then(data => {
            const { html } = data;
            convert2pdf(html, `facture-${facture.vente.factureId}.pdf`);
            this.setState({ loadingFacture: false });
        }).catch(() => this.setState({ loadingFacture: false }));
    }

    handleDownloadAllFactures() {
        _.filter(this.state.data, this.filter).forEach(facture => {
            this.handleDownloadFacture(facture);
        });
    }

    render() {
        const headers = this.getCSVHeaders();
        const data = this.getCSVData();
        return (
            <Segment basic loading={this.state.loading}>
                <Filter />
                <Button
                    fluid primary
                    icon="download"
                    content="Télécharger toutes les factures"
                    onClick={this.handleDownloadAllFactures}
                />
                <br />
                <List
                    headers={headers}
                    data={data}
                    csvName="factures.csv"
                />
            </Segment>
        );
    }
}

ListFactures.propTypes = {
    match: PropTypes.object,
};

export default ListFactures;