// React
import React from 'react';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

const List = props => (
    <Table striped textAlign='left'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Message</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            props.data &&
            _.orderBy(Object.keys(props.data), key => new Date(props.data[key].date).getTime(), ["desc"]).map(key => {
                const note = props.data[key];
                const date = new Date(note.date);
                const parsedDate = `${addZero(date.getDate())}/${addZero(date.getMonth()+1)}/${date.getFullYear()}`;
                return (
                    <Table.Row key={key}>
                        <Table.Cell>{parsedDate}</Table.Cell>
                        <Table.Cell>{note.message}</Table.Cell>
                    </Table.Row>
                );
            })
        }
        </Table.Body>
    </Table>
);

List.propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
};

export default withRouter(List);