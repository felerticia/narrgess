// React
import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const getTotal = (details, type) => {
    const filteredDetails = _.filter(details, e => e.type === type);
    if (filteredDetails.length === 0) return 0;
    return filteredDetails.map(e => e.montant).reduce((a, b) => a + b);
};

const Bilan = props => {
    const ventes = getTotal(props.details, "Vente");
    const encaissements = getTotal(props.details, "Encaissement");
    const impayes = getTotal(props.details, "Impaye");
    const remboursements = getTotal(props.details, "Remboursement");
    return (
        <Table celled structured textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Reste à payer</Table.HeaderCell>
                    <Table.Cell>{Math.round((ventes - encaissements + impayes + remboursements)*100)/100} €</Table.Cell>
                </Table.Row>
            </Table.Header>
        </Table>
    );
}

Bilan.propTypes = {
    details: PropTypes.array,
};

export default Bilan;