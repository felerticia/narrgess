// React
import React, { Component } from 'react';
import { Segment, Header, Form, Checkbox, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getMoniteurs } from '../../../../actions/get.action';

class ChoiceCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moniteurs: {},
            loadingMoniteurs: true,
        };

        this.getOptions = this.getOptions.bind(this);
    }

    UNSAFE_componentWillMount() {
        getMoniteurs().then(moniteurs => this.setState({ moniteurs, loadingMoniteurs: false }));
    }

    getOptions() {
        if (this.props.chosenType === 'moniteur') {
            return Object.keys(this.state.moniteurs).map(key => ({
                key,
                value:key,
                text: `${this.state.moniteurs[key].nom} ${this.state.moniteurs[key].prenom}`,
            }));
        }
        return {};
    }

    render() {
        return (
            <Segment loading={this.state.loadingMoniteurs}>
                <Header content="Choix du moniteur ou de l'élève" />
                <Form>
                    <Form.Group>
                        <Form.Field width={4}>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Moniteur'
                                    value='moniteur'
                                    checked={this.props.chosenType === 'moniteur'}
                                    onChange={(_, { value }) => this.props.handleChange('chosenType', value)}
                                />
                            </Form.Field>
                        </Form.Field>
                        <Form.Field width={12}>
                            <Dropdown
                                fluid search selection
                                value={this.props.chosenValue}
                                options={this.getOptions()}
                                onChange={(_, { value }) => this.props.handleChange('chosenValue', value)}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

ChoiceCalendar.propTypes = {
    chosenType: PropTypes.string,
    chosenValue: PropTypes.string,
    handleChange: PropTypes.func,
};

export default ChoiceCalendar;
