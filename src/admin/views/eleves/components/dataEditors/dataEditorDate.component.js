// React requirement
import React from 'react';
import { Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

const DataEditorDate = props => (
    <DatePicker
        customInput={<Input
            label={props.label}
            labelPosition='left'
        />}
        isClearable={true}
        selected={props.data ? moment(props.data) : null}
        onChange={value => {props.handleChange(value ? value.toString() : null); props.handleSubmit(value ? value.toString() : null)}}
        dateFormat="DD/MM/YYYY"
        locale='fr'
    />
);

DataEditorDate.propTypes = {
    label: PropTypes.string,
    data: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default DataEditorDate;