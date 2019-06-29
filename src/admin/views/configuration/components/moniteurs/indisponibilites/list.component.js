// React
import React, { Component } from 'react';
import { Segment, Header, Button, Message } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router';
import BigCalendar from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from 'moment';

// Local
import AddIndisponibilite from './add.component';
import { messages, formats, getMinHour, getMaxHour } from './bigCalendrier.config';

// actions
import { getEvents } from '../../../../../../actions/get.action';
import { deleteMoniteurIndisponibilites } from '../../../../../../actions/delete.action';

BigCalendar.momentLocalizer(moment);

class ListIndisponibilites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            errorMsg: "",
            add: false,
            step: 45,
            events: [],
            currentDate: new Date(),
        };

        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEvents(this.props.match.params.id, "moniteur").then(eventsWithDateString => {
            const events = [];
            eventsWithDateString.forEach(event => {
                if (event.title && event.indisponibiliteKey && event.title.includes("Indisponilité")) {
                    events.push(Object.assign(event, {
                        start: new Date(event.start),
                        end: new Date(event.end),
                    }));
                }
            });
            this.setState({ events, errorMsg: "", loading: false });
        })
        .catch(err => this.setState({ errorMsg: err.message, loading: false }));
    }

    toggleAdd() {
        this.setState({ add: !this.state.add })
    }

    toggleConfirm(key, regulier) {
        confirmAlert({
            title: "Supprimer",
            message: `Voulez-vous vraiment supprimer ${regulier ? "toutes les occurences de cette" : "cette"} indisponibilité ?`,
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(key) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(key) {
        deleteMoniteurIndisponibilites(this.props.match.params.id, key);
    }

    render() {
        return (
            <Segment raised loading={this.state.loading}>
                <Message
                    warning
                    icon='warning'
                    content={this.state.errorMsg}
                    hidden={this.state.errorMsg.length === 0}
                />
                <Header textAlign="center">Indisponibilités</Header>
                <Header as="h5"><i>Pour supprimer une indisponibilité, faites un double click dessus</i></Header>
                <BigCalendar
                    popup showMultiDayTimes
                    date={this.state.currentDate}
                    events={this.state.events}
                    views={['month', 'week', 'day']}
                    defaultView='week'
                    onNavigate={currentDate => this.setState({ currentDate })}
                    onDoubleClickEvent={event => this.toggleConfirm(event.indisponibiliteKey, event.indisponibiliteRegulier)}
                    step={this.state.step}
                    timeslots={2}
                    titleAccessor={event => event.title}
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
                <br />
                <Button
                    circular
                    positive={!this.state.add}
                    negative={this.state.add}
                    icon={this.state.add ? 'close' : 'add'}
                    onClick={this.toggleAdd}
                />
                { this.state.add && <AddIndisponibilite toggleAdd={this.toggleAdd} /> }
            </Segment>
        );
    }
}

ListIndisponibilites.propTypes = {
    match: PropTypes.object,
};

export default withRouter(ListIndisponibilites);
