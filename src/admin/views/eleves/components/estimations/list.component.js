// React
import React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

const List = props => (
    <Table striped textAlign='left'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Moniteur</Table.HeaderCell>
                <Table.HeaderCell>Estimation</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            props.data &&
            Object.keys(props.data).map(key => {
                const estimation = props.data[key];
                const moniteur = props.moniteurs[estimation.moniteur] ? props.moniteurs[estimation.moniteur] : {};
                return (
                    <Table.Row key={key} warning={!estimation.viewed}>
                        <Table.Cell>{moniteur.nom} {moniteur.prenom}</Table.Cell>
                        <Table.Cell>{estimation.value} heures</Table.Cell>
                    </Table.Row>
                );
            })
        }
        </Table.Body>
    </Table>
);

List.propTypes = {
    data: PropTypes.object,
    moniteurs: PropTypes.object,
    match: PropTypes.object,
};

export default withRouter(List);