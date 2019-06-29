// React
import React, { Component } from 'react';
import { Segment, Header, Message, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import BigCalendar from './components/bigCalendar.component';
import SmallCalendar from './components/smallCalendar.component';

// actions
import { getEvents } from '../../../../../actions/get.action';

class Planning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            errorMsg: "",
        };
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        getEvents(id, "eleve").then(eventsWithDateString => {
            const events = [];
            eventsWithDateString.forEach(event => {
                events.push(Object.assign(event, {
                    start: new Date(event.start),
                    end: new Date(event.end),
                }));
            });
            this.setState({ events, errorMsg: "", loading: false })
        })
        .catch(err => this.setState({ errorMsg: err.message, loading: false }));
    }

    render() {
        return (
            <Segment color="orange" loading={this.state.loading}>
                <Message
                    warning
                    icon='warning'
                    content={this.state.errorMsg}
                    hidden={this.state.errorMsg.length === 0}
                />
                <Header content="Planning" textAlign="center" />
                <Responsive
                    as={() => <BigCalendar events={this.state.events} />}
                    minWidth={1024}
                />
                <Responsive
                    as={() => <SmallCalendar events={this.state.events} />}
                    maxWidth={1023}
                />
            </Segment>
        );
    }
}

Planning.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Planning