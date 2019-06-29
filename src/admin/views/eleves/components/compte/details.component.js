// React
import React, { Component } from 'react';
import { Table, Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getPDFContrat, getPDFFacture, getBoutiques, getUserLevel, getBoutiquesArchives } from '../../../../../actions/get.action';
import { deleteEleveCompte } from '../../../../../actions/delete.action';
import { convert2pdf } from '../../../../../actions/convert.action';

const DMY2Time = dateString => {
    const dateArray = dateString.split('/');
    const date = new Date();
    date.setDate(dateArray[0]);
    date.setMonth(dateArray[1] - 1)
    date.setFullYear(dateArray[2]);
    return date.getTime();
};

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false,
            boutique: {},
            userLevel: 0,
            loadingBoutique: true,
            loadingUserLevel: true,
            loadingButton: false,
        };

        this.dataToDetails = this.dataToDetails.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDownloadContrat = this.handleDownloadContrat.bind(this);
        this.handleDownloadFacture = this.handleDownloadFacture.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getUserLevel(uid).then(userLevel => this.setState({ userLevel, loadingUserLevel: false }));
        getBoutiques().then(boutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const allBoutique = {...boutique, ...archivesBoutique};
                this.setState({ boutique: allBoutique, loadingBoutique: false });
            });
        });
    }

    dataToDetails() {
        const details = [];
        if (this.props.data.ventes) {
            Object.keys(this.props.data.ventes).forEach(key => {
                const vente = this.props.data.ventes[key];
                const produit = this.state.boutique[vente.produit] ? this.state.boutique[vente.produit] : {};
                details.push({
                    key,
                    date: vente.date,
                    quantite: vente.quantite,
                    label: produit.nom,
                    debit: vente.quantite * produit.prix,
                    type: 'ventes',
                    getPDFContrat: produit.contrat ? () => getPDFContrat(produit.contrat, this.props.match.params.id) : null,
                    getPDFFacture: () => getPDFFacture({ vente, produit, eleveId: this.props.match.params.id }),
                });
            });
        }
        if (this.props.data.encaissements) {
            Object.keys(this.props.data.encaissements).forEach(key => {
                const encaissement = this.props.data.encaissements[key];
                details.push({
                    key,
                    date: encaissement.date,
                    label: `${encaissement.paiementPar}${encaissement.chequeNumber ? ` ${encaissement.chequeNumber}` : ""}`,
                    credit: encaissement.montant,
                    type: 'encaissements',
                });
            });
        }
        if (this.props.data.impayes) {
            Object.keys(this.props.data.impayes).forEach(key => {
                const impaye = this.props.data.impayes[key];
                details.push({
                    date: impaye.date,
                    label: `Impayé - ${impaye.type}${impaye.chequeNumber ? ` ${impaye.chequeNumber}` : ""}`,
                    debit: impaye.montant,
                    type: 'impayes',
                    key,
                });
            });
        }
        if (this.props.data.remboursements) {
            Object.keys(this.props.data.remboursements).forEach(key => {
                const remboursement = this.props.data.remboursements[key];
                details.push({
                    date: remboursement.date,
                    label: `Remboursement - ${remboursement.type}`,
                    debit: remboursement.montant,
                    type: 'remboursements',
                    key,
                });
            });
        }
        return details;
    }

    toggleConfirm(type, key) {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(type, key) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDownloadContrat(value) {
        this.setState({ loadingButton: true });
        value.getPDFContrat().then(data => {
            const { html } = data;
            convert2pdf(html, "contrat.pdf");
            this.setState({ loadingButton: false });
        }).catch(() => this.setState({ loadingButton: false }));
    }

    handleDownloadFacture(value) {
        this.setState({ loadingButton: true });
        value.getPDFFacture().then(data => {
            const { html } = data;
            convert2pdf(html, "facture.pdf");
            this.setState({ loadingButton: false });
        }).catch(() => this.setState({ loadingButton: false }));
    }

    handleDelete(type, key) {
        this.setState({ loading: true });
        deleteEleveCompte(this.props.match.params.id, type, key).then(() => {
            this.props.fetchData();
            this.setState({ loading: false });
        });
    }

    render() {
        const details = this.state.loadingBoutique ? [] : this.dataToDetails();
        return (
            <Segment basic loading={this.state.loadingBoutique || this.state.loadingUserLevel}>
                <Table striped textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Libellé</Table.HeaderCell>
                            <Table.HeaderCell>Quantite</Table.HeaderCell>
                            <Table.HeaderCell>Débit</Table.HeaderCell>
                            <Table.HeaderCell>Crédit</Table.HeaderCell>
                            <Table.HeaderCell>Contrat</Table.HeaderCell>
                            <Table.HeaderCell>Facture</Table.HeaderCell>
                            <Table.HeaderCell>Supprimer</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        details &&
                        _.orderBy(details, value => DMY2Time(value.date), ['desc']).map(value => (
                            <Table.Row key={value.key}>
                                <Table.Cell>{value.date}</Table.Cell>
                                <Table.Cell>{value.label}</Table.Cell>
                                <Table.Cell>{value.quantite}</Table.Cell>
                                <Table.Cell>{value.debit}</Table.Cell>
                                <Table.Cell>{value.credit}</Table.Cell>
                                <Table.Cell>
                                {
                                    value.getPDFContrat ?
                                    <Button
                                        primary circular
                                        icon="file"
                                        loading={this.state.loadingButton}
                                        onClick={() => this.handleDownloadContrat(value)}
                                    /> : null
                                }
                                </Table.Cell>
                                <Table.Cell>
                                {
                                    value.getPDFFacture ?
                                    <Button
                                        primary circular
                                        icon="file"
                                        loading={this.state.loadingButton}
                                        onClick={() => this.handleDownloadFacture(value)}
                                    /> : null
                                }
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        this.state.userLevel >= 1 &&
                                        <Button
                                            negative circular
                                            icon='trash'
                                            onClick={() => this.toggleConfirm(value.type, value.key)}
                                        />
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

Details.propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
    fetchData: PropTypes.func,
};

export default withRouter(Details);