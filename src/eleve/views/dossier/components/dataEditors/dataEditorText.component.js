// React requirement
import React from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DataEditorText = props => (
    <Grid verticalAlign="middle">
        <Grid.Row columns={2} style={{ padding: "7px" }}>
            <Grid.Column width={14}>
            {
                props.edit ?
                <Input
                    fluid
                    value={props.value}
                    label={props.label}
                    onChange={(_, { value }) => props.handleChange(value)}
                /> :
                <div>
                    <label><b>{props.label} : </b></label>
                    <span>{props.value}</span>
                </div>
            }
            </Grid.Column>
            <Grid.Column width={2}>
                <Button
                    circular
                    size="tiny"
                    loading={props.loading}
                    color={props.edit ? "green" : "orange"}
                    icon={props.edit ? "check" : "edit"}
                    onClick={props.toggleEdit}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

DataEditorText.propTypes = {
    loading: PropTypes.bool,
    edit: PropTypes.edit,
    value: PropTypes.string,
    label: PropTypes.string,
    toggleEdit: PropTypes.func,
    handleChange: PropTypes.func,
};

export default DataEditorText;