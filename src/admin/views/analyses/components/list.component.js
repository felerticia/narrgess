// React
import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const List = props => (
    !(props.data && props.data.length > 1) ? "" :
    <Table definition>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell />
                {
                    Object.keys(props.data[0]).map(key => (
                        <Table.HeaderCell key={key}>{key}</Table.HeaderCell>
                    ))
                }
            </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            props.data.map((value, indexRow) => (
                <Table.Row key={indexRow}>
                    <Table.Cell>{indexRow+1}</Table.Cell>
                    {
                        Object.values(value).map((val, indexCol) => (
                            <Table.Cell key={indexCol}>{val}</Table.Cell>
                        ))
                    }
                </Table.Row>
            ))
        }
        </Table.Body>
    </Table>
);

List.propTypes = {
    data: PropTypes.array,
};

export default List;