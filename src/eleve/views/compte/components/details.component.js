// React
import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const DMY2Time = dateString => {
    const dateArray = dateString.split('/');
    const date = new Date();
    date.setDate(dateArray[0]);
    date.setMonth(dateArray[1] - 1)
    date.setFullYear(dateArray[2]);
    return date.getTime();
};

const Details = props => (
    <Table striped textAlign='center'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Libellé</Table.HeaderCell>
                <Table.HeaderCell>Quantité</Table.HeaderCell>
                <Table.HeaderCell>Montant</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            props.details &&
            _.orderBy(props.details, value => DMY2Time(value.date), ['desc']).map(value => (
                <Table.Row key={value.key}>
                    <Table.Cell>{value.date}</Table.Cell>
                    <Table.Cell>{value.type}</Table.Cell>
                    <Table.Cell>{value.label}</Table.Cell>
                    <Table.Cell>{value.quantite ? value.quantite : "/"}</Table.Cell>
                    <Table.Cell>{value.montant} €</Table.Cell>
                </Table.Row>
            ))
        }
        </Table.Body>
    </Table>
);

Details.propTypes = {
    details: PropTypes.array,
};

export default Details;