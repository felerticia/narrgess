// react// React
import React from 'react';
import { Table, Divider, Button} from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';

const List = props => (
    <div>
        <div style={{ width: "100%", overflowX: "scroll" }}>
            <Table celled={props.celled} singleLine striped textAlign='center'>
                <Table.Header>
                    <Table.Row>
                    {
                        props.headers.map(header => (
                            <Table.HeaderCell key={header.key}>{header.label}</Table.HeaderCell>
                        ))
                    }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    props.data.map((obj, key) => (
                        <Table.Row key={key}>
                        {
                            props.headers.map(header => (
                                <Table.Cell key={header.key}>{obj[header.key]}</Table.Cell>
                            ))
                        }
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
        </div>
        <Divider />
        <CSVLink
            target="_self"
            filename={props.csvName}
            headers={props.headers}
            data={props.data}
            separator=";"
        >
            <Button
                fluid positive
                icon="download"
                content="Exporter"
            />
        </CSVLink>
    </div>
);

List.propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    celled: PropTypes.bool,
    csvName: PropTypes.string,
};

export default List;