// React requirement
import React from 'react';
import { Dropdown, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DataEditorSelect = props => (
    <Grid verticalAlign="middle">
        <Grid.Row columns={2} style={{ padding: "7px" }}>
            <Grid.Column width={14}>
            {
                props.edit ?
                <Dropdown
                    fluid selection labeled button floating
                    value={props.value}
                    onChange={(_, { value }) => props.handleChange(value)}
                    loading={props.loading}
                    options={!props.options ? null : props.options.map(option => ({
                        key: option,
                        value: option,
                        text: option,
                    }))}
                    className="icon"
                    icon="caret down"
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

DataEditorSelect.propTypes = {
    edit: PropTypes.bool,
    loading: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.any,
    toggleEdit: PropTypes.func,
    handleChange: PropTypes.func,
};

export default DataEditorSelect;