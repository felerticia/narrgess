// React
import React, { Component } from 'react';
import { Segment, Dropdown, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';

// actions
import { addExamenEleve } from '../../../../../../actions/add.action';
import { getExamens } from '../../../../../../actions/get.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class AddNextExamen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            examens: {},
            value: "",
            loading: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        getExamens().then(allExamens => {
            const examensKeys = _.filter(Object.keys(allExamens), key => new Date() <= new Date(allExamens[key].start) && allExamens[key].places > Object.values(allExamens[key].eleves ? allExamens[key].eleves : {}).length);
            const examens = {};
            examensKeys.forEach(key => examens[key] = allExamens[key]);
            this.setState({ examens, loading: false });
        });
    }

    handleSubmit() {
        this.setState({ loading: true });
        addExamenEleve(this.state.value, { eleve: this.props.match.params.id }).then(() => {
            this.setState({ loading: false });
            this.props.reset();
        });
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Dropdown
                    fluid selection
                    placeholder="Choisir un examen..."
                    value={this.state.value}
                    onChange={(_, { value }) => this.setState({ value })}
                    options={_.orderBy(Object.keys(this.state.examens), key => new Date(this.state.examens[key].start)).map(key => ({
                        key,
                        value: key,
                        text: `Examen ${this.state.examens[key].type} du ${addZero(new Date(this.state.examens[key].start).getDate())}/${addZero(new Date(this.state.examens[key].start).getMonth())}/${new Date(this.state.examens[key].start).getFullYear()} - ${addZero(new Date(this.state.examens[key].start).getHours())}:${addZero(new Date(this.state.examens[key].start).getMinutes())} à ${addZero(new Date(this.state.examens[key].end).getHours())}:${addZero(new Date(this.state.examens[key].end).getMinutes())}`,
                    }))}
                />
                <br />
                <Button
                    fluid
                    icon="add"
                    content="Ajouter"
                    positive={this.state.value.length !== 0}
                    disabled={this.state.value.length === 0}
                    onClick={this.handleSubmit}
                />
            </Segment>
        );
    }
}

AddNextExamen.propTypes = {
    reset: PropTypes.func,
    match: PropTypes.object,
};

export default withRouter(AddNextExamen);