// React
import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';

// Local
import Details from '../components/details.component';
import Bilan from '../components/bilan.component';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getEleveCompte, getBoutiques, getBoutiquesArchives } from '../../../../actions/get.action';

class DetailsCompte extends Component {
    constructor(props) {
        super(props);

        this.state = {
            compte: {},
            boutique: {},
            loading: true,
        };

        this.dataToDetails = this.dataToDetails.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getEleveCompte(uid).then(compte => {
            getBoutiques().then(onlineBoutique => {
                getBoutiquesArchives().then(archivesBoutique => {
                    const boutique = {...onlineBoutique, ...archivesBoutique};
                    this.setState({
                        compte,
                        boutique,
                        loading: false,
                    });
                });
            });
        });
    }

    dataToDetails() {
        const details = [];
        if (this.state.compte.ventes) {
            Object.keys(this.state.compte.ventes).forEach(key => {
                const vente = this.state.compte.ventes[key];
                const produit = this.state.boutique[vente.produit] ? this.state.boutique[vente.produit] : {};
                details.push({
                    key,
                    date: vente.date,
                    quantite: vente.quantite,
                    label: produit.nom,
                    montant: vente.quantite * produit.prix,
                    type: "Vente",
                });
            });
        }
        if (this.state.compte.encaissements) {
            Object.keys(this.state.compte.encaissements).forEach(key => {
                const encaissement = this.state.compte.encaissements[key];
                details.push({
                    key,
                    date: encaissement.date,
                    label: `${encaissement.paiementPar}${encaissement.chequeNumber ? ` ${encaissement.chequeNumber}` : ""}`,
                    montant: encaissement.montant,
                    type: "Encaissement",
                });
            });
        }
        if (this.state.compte.impayes) {
            Object.keys(this.state.compte.impayes).forEach(key => {
                const impaye = this.state.compte.impayes[key];
                details.push({
                    date: impaye.date,
                    label: `Impayé - ${impaye.type}`,
                    montant: impaye.montant,
                    type: "Impayé",
                    key,
                });
            });
        }
        if (this.state.compte.remboursements) {
            Object.keys(this.state.compte.remboursements).forEach(key => {
                const remboursement = this.state.compte.remboursements[key];
                details.push({
                    date: remboursement.date,
                    label: `Remboursement - ${remboursement.type}`,
                    montant: remboursement.montant,
                    type: "Remboursement",
                    key,
                });
            });
        }
        return details;
    }

    render() {
        const details = this.state.loading ? [] : this.dataToDetails();
        return (
            <Segment raised color="orange" loading={this.state.loading}>
                <Header as="h2" content="Détails" textAlign="center" />
                <Details details={details} />
                <Divider />
                <Bilan details={details} />
            </Segment>
        );
    }
}

export default DetailsCompte;