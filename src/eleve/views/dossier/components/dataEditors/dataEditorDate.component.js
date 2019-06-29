// React requirement
import React from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

const DataEditorDate = props => (
    <Grid verticalAlign="middle">
        <Grid.Row columns={2} style={{ padding: "7px" }}>
            <Grid.Column width={14}>
            {
                props.edit ?
                <DatePicker
                    customInput={<Input
                        label={props.label}
                        labelPosition='left'
                    />}
                    isClearable={true}
                    selected={props.value ? moment(props.value) : null}
                    onChange={value => props.handleChange(value ? value.toString() : null)}
                    dateFormat="DD/MM/YYYY"
                    locale='fr'
                /> :
                <div>
                    <label><b>{props.label} : </b></label>
                    {
                        isNaN(new Date(props.value).getDate()) ? "" :
                        <span>{addZero(new Date(props.value).getDate())}/{addZero(new Date(props.value).getMonth()+1)}/{addZero(new Date(props.value).getFullYear())}</span>
                    }
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

DataEditorDate.propTypes = {
    label: PropTypes.string,
    data: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default DataEditorDate;