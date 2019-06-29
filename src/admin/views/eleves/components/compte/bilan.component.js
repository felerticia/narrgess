// React
import React, { Component } from 'react';
import { Table, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getBoutiques, getBoutiquesArchives } from '../../../../../actions/get.action';

class Bilan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            boutique: {},
        };

        this.getTotalVentes = this.getTotalVentes.bind(this);
        this.getTotalEncaissements = this.getTotalEncaissements.bind(this);
        this.getTotalImpayes = this.getTotalImpayes.bind(this);
        this.getTotalRemboursements = this.getTotalRemboursements.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(onlineBoutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const boutique = {...onlineBoutique, ...archivesBoutique};
                this.setState({ boutique, loading: false });
            });
        });
    }

    getTotalVentes() {
        const ventes = this.props.data.ventes ? this.props.data.ventes : {};
        let totalVentes = 0;
        Object.values(ventes).forEach(vente => {
            const { produit, quantite } = vente;
            const prix = this.state.boutique[produit].prix ? this.state.boutique[produit].prix : 0;
            totalVentes += prix * quantite;
        });
        return totalVentes;
    }

    getTotalEncaissements() {
        const encaissements = this.props.data.encaissements ? this.props.data.encaissements : {};
        let totalEncaissements = 0;
        Object.values(encaissements).forEach(encaissement => {
            const { montant } = encaissement;
            totalEncaissements += montant;
        });
        return totalEncaissements;
    }

    getTotalImpayes() {
        const impayes = this.props.data.impayes ? this.props.data.impayes : {};
        let totalImpayes = 0;
        Object.values(impayes).forEach(impaye => {
            const { montant } = impaye;
            totalImpayes += montant;
        });
        return totalImpayes;
    }

    getTotalRemboursements() {
        const remboursements = this.props.data.remboursements ? this.props.data.remboursements : {};
        let totalRemboursements = 0;
        Object.values(remboursements).forEach(remboursement => {
            const { montant } = remboursement;
            totalRemboursements += montant;
        });
        return totalRemboursements;
    }

    render() {
        const ventes = this.state.loading ? 0 : this.getTotalVentes();
        const encaissements = this.state.loading ? 0 : this.getTotalEncaissements();
        const impayes = this.state.loading ? 0 : this.getTotalImpayes();
        const remboursements = this.state.loading ? 0 : this.getTotalRemboursements();
        return (
            <Segment basic loading={this.state.loading}>
                <Table celled structured textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={4}>Totaux</Table.HeaderCell>
                            <Table.HeaderCell rowSpan={2}>Reste à payer</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Ventes</Table.HeaderCell>
                            <Table.HeaderCell>Encaissements</Table.HeaderCell>
                            <Table.HeaderCell>Impayés</Table.HeaderCell>
                            <Table.HeaderCell>Remboursements</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {
                        this.props.data &&
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{Math.round(ventes*100)/100} €</Table.Cell>
                                <Table.Cell>{Math.round(encaissements*100)/100} €</Table.Cell>
                                <Table.Cell>{Math.round(impayes*100)/100} €</Table.Cell>
                                <Table.Cell>{Math.round(remboursements*100)/100} €</Table.Cell>
                                <Table.Cell>{Math.round((ventes - encaissements + impayes + remboursements)*100)/100} €</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    }
                </Table>
            </Segment>  
        );
    }
}

Bilan.propTypes = {
    data: PropTypes.object,
};

export default Bilan;