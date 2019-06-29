// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local
import DataEditorText from './dataEditors/dataEditorText.component';
import DataEditorSelect from './dataEditors/dataEditorSelect.component';
import DataEditorDate from './dataEditors/dataEditorDate.component';
import DataEditorAddress from './dataEditors/dataEditorAddress.component';

// actions
import { requestSetFirebase } from '../../../../actions/utils';

class DataEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            value: props.value,
            loading: false,
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) this.setState({ value: nextProps.value });
    }

    toggleEdit() {
        this.setState({ loading: true });
        if (this.state.edit) this.handleSubmit(this.state.value);
        this.setState({ edit: !this.state.edit, loading: false });
    }

    handleChange(value) {
        this.setState({ value });
    }

    handleSubmit(value) {
        this.setState({ value });
        requestSetFirebase(this.props.firebaseRef, value).then(() => this.setState({ loading: false }));
    }

    render() {
        return (
            this.props.type === 'text' ?
            <DataEditorText
                edit={this.state.edit}
                loading={this.state.loading}
                value={this.state.value}
                label={this.props.label}
                toggleEdit={this.toggleEdit}
                handleChange={this.handleChange}
            /> :
            this.props.type === 'select' ?
            <DataEditorSelect
                edit={this.state.edit}
                loading={this.state.loading}
                options={this.props.options}
                value={this.state.value}
                label={this.props.label}
                toggleEdit={this.toggleEdit}
                handleChange={this.handleChange}
            /> :
            this.props.type === 'date' ?
            <DataEditorDate
                edit={this.state.edit}
                label={this.props.label}
                value={this.state.value}
                toggleEdit={this.toggleEdit}
                handleChange={this.handleChange}
            /> :
            this.props.type === 'address' ?
            <DataEditorAddress
                edit={this.state.edit}
                label={this.props.label}
                value={this.state.value}
                firebaseRef={this.props.firebaseRef}
                toggleEdit={this.toggleEdit}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            /> : null
        );
    }
}

DataEditor.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    firebaseRef: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.any,
};

export default DataEditor;
