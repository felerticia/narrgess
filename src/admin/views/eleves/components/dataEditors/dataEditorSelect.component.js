// React requirement
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DataEditorSelect = props => (
    <Dropdown
        fluid selection labeled button floating
        className='icon'
        value={props.data}
        onBlur={() => props.toggleFocus(false)}
        onFocus={() => props.toggleFocus(true)}
        onChange={(_, { value }) => {props.handleChange(value); props.handleSubmit(value);}}
        loading={props.loading}
        options={!props.options ? null : props.options.map(option => ({
            key: option,
            value: option,
            text: option,
        }))}
        text={`${props.label} : ${props.data}`}
        icon="caret down"
    />
);

DataEditorSelect.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.any,
    toggleFocus: PropTypes.func,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default DataEditorSelect;