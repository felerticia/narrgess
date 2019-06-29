// React requirement
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import DataEditorText from './dataEditors/dataEditorText.component';
import DataEditorSelect from './dataEditors/dataEditorSelect.component';
import DataEditorDate from './dataEditors/dataEditorDate.component';
import DataEditorAddress from './dataEditors/dataEditorAddress.component';

// actions
import { editEleve, editUserEmail } from '../../../../actions/edit.action';

class DataEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            focus: false,
            data: props.data,
            loading: false,
        };

        this.toggleHover = this.toggleHover.bind(this);
        this.toggleFocus = this.toggleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.state.data) {
            this.setState({ data: nextProps.data });
        }
    }

    toggleHover(val) {
        if (!this.state.loading) {
            this.setState({
                hover: this.state.focus ? true : val,
            });
        }
    }

    toggleFocus(val) {
        if (!this.state.loading) {
            this.setState({
                focus: val,
                hover: val,
            });
        }
    }

    handleChange(data) {
        if (this.state.focus) {
            this.setState({ data });
        }
    }

    handleSubmit(value) {
        this.setState({ focus: false, loading: true });
        const payloads = {};
        const splitted_ref = this.props.firebaseRef.split("/");
        const id = splitted_ref[2];
        if (splitted_ref[splitted_ref.length - 1] === "email") {
            editUserEmail(id, value).then(() => {
                this.props.fetchData();
                this.setState({ loading: false });
            });
        } else {
            let sub_payloads = payloads;
            for (let i = 3; i < splitted_ref.length-1; i += 1) {
                sub_payloads[splitted_ref[i]] = {};
                sub_payloads = sub_payloads[splitted_ref[i]];
            }
            sub_payloads[splitted_ref[splitted_ref.length-1]] = value;
            editEleve(id, payloads).then(() => {
                this.props.fetchData();
                this.setState({ loading: false });
            });
        }
    }

    render() {
        return (
            this.props.type === 'text' ?
            <DataEditorText
                loading={this.state.loading}
                hover={this.state.hover}
                focus={this.state.focus}
                data={this.state.data}
                label={this.props.label}
                toggleHover={this.toggleHover}
                toggleFocus={this.toggleFocus}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            /> :
            this.props.type === 'select' ?
            <DataEditorSelect
                loading={this.state.loading}
                options={this.props.options}
                data={this.state.data}
                label={this.props.label}
                toggleFocus={this.toggleFocus}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            /> :
            this.props.type === 'date' ?
            <DataEditorDate
                label={this.props.label}
                data={this.state.data}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            /> :
            this.props.type === 'address' ?
            <DataEditorAddress
                label={this.props.label}
                data={this.state.data}
                hover={this.state.hover}
                focus={this.state.focus}
                firebaseRef={this.props.firebaseRef}
                toggleHover={this.toggleHover}
                toggleFocus={this.toggleFocus}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            /> :
            <Input
                fluid
                transparent={true}
                value={this.props.data}
                label={this.props.label}
                labelPosition='left'
                onChange={null}
            />
        );
    }
}

DataEditor.propTypes = {
    data: PropTypes.string,
    label: PropTypes.string,
    firebaseRef: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.any,
    fetchData: PropTypes.func,
};

export default DataEditor;