// React
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Local
import {
    messages,
    formats,
    getMinHour,
    getMaxHour,
} from './bigCalendar.config';

BigCalendar.momentLocalizer(moment);

class Planning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 30,
            currentDate: new Date(),
        };
    }

    render() {
        return (
            <div>
                <Button
                    content={this.state.step === 15 ? 'Réduire' : 'Développer'}
                    onClick={() => this.setState({ step: this.state.step === 15 ? 30 : 15 })}
                />
                <br /><br />
                <BigCalendar
                    popup showMultiDayTimes
                    date={this.state.currentDate}
                    events={this.props.events}
                    views={['month', 'week', 'day']}
                    defaultView='week'
                    onNavigate={currentDate => this.setState({ currentDate })}
                    step={this.state.step}
                    timeslots={2}
                    titleAccessor={event => event.title ? event.title : `${event.eleve.dossier.eleve.nom} ${event.eleve.dossier.eleve.prenom}`}
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
            </div>
        );
    }
}

Planning.propTypes = {
    events: PropTypes.array,
};

export default Planning