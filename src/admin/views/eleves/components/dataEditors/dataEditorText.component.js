// React requirement
import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DataEditorText = props => (
    <Input
        fluid
        loading={props.loading}
        transparent={!props.hover}
        focus={props.focus}
        value={props.data}
        label={props.label}
        labelPosition='left'
        action={props.focus ? <Button positive icon='check' onClick={() => props.handleSubmit(props.data)} /> : null}
        onFocus={() => props.toggleFocus(true)}
        onChange={(_, { value }) => props.handleChange(value)}
        onMouseEnter={() => props.toggleHover(true)}
        onMouseLeave={() => props.toggleHover(false)}
        onKeyPress={e => e.key === 'Enter' ? props.handleSubmit(props.data) : null}
    />
);

DataEditorText.propTypes = {
    loading: PropTypes.bool,
    hover: PropTypes.bool,
    focus: PropTypes.bool,
    data: PropTypes.string,
    label: PropTypes.string,
    toggleHover: PropTypes.func,
    toggleFocus: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
};

export default DataEditorText;