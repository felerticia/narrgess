// React
import React, { Component } from 'react';
import { Segment, Message, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Local
import {
    messages,
    formats,
    getMinHour,
    getMaxHour,
} from './bigCalendrier.config';

// actions
import { getEvents } from '../../../../actions/get.action';

BigCalendar.momentLocalizer(moment);

class BigCalendrier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            step: 15,
            events: [],
            errorMsg: "",
            currentDate: new Date(),
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps);
    }

    fetchData({ chosenValue, chosenType }) {
        this.setState({ loading: true });
        getEvents(chosenValue, chosenType).then(eventsWithDateString => {
            const events = [];
            eventsWithDateString.forEach(event => {
                events.push(Object.assign(event, {
                    start: new Date(event.start),
                    end: new Date(event.end),
                }));
            });
            this.setState({ events, errorMsg: "", loading: false });
        })
        .catch(err => this.setState({ errorMsg: err.message, loading: false }));
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Message
                    warning
                    icon='warning'
                    content={this.state.errorMsg}
                    hidden={this.state.errorMsg.length === 0}
                />
                <Button
                    content={this.state.step === 15 ? 'Réduire' : 'Développer'}
                    onClick={() => this.setState({ step: this.state.step === 15 ? 30 : 15 })}
                />
                <br /><br />
                <BigCalendar
                    popup showMultiDayTimes
                    date={this.state.currentDate}
                    events={this.state.events}
                    views={['month', 'week', 'day']}
                    defaultView='week'
                    onNavigate={currentDate => this.setState({ currentDate })}
                    step={this.state.step}
                    timeslots={2}
                    titleAccessor={event => (
                        event.title ? event.title :
                        this.props.chosenType === 'eleve' ?
                        event.moniteur.nom ? `${event.moniteur.nom} ${event.moniteur.prenom}` :
                        `${event.typeRDV.nom}` :
                        this.props.chosenType === 'moniteur' ?
                        `${event.eleve.dossier.eleve.nom} ${event.eleve.dossier.eleve.prenom}` : ""
                    )}
                    startAccessor={event => event.start}
                    endAccessor={event => event.end}
                    min={getMinHour(this.state.currentDate)}
                    max={getMaxHour(this.state.currentDate)}
                    culture='fr'
                    messages={messages}
                    formats={formats}
                    eventPropGetter={event => ({ style: {
                        backgroundColor: event.color,
                        borderColor: event.color,
                    }})}
                />
            </Segment>
        );
    }
}

BigCalendrier.propTypes = {
    chosenType: PropTypes.string,
    chosenValue: PropTypes.string,
};

export default BigCalendrier;
