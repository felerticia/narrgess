// React
import React, { Component } from 'react';
import { Container, Segment, Message, Header, Responsive, Dimmer } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import BigCalendar from './containers/bigCalendar.container';
import SmallCalendar from './containers/smallCalendar.container';
import DimmerContent from './containers/dimmerContent.container';

// actions
import { getLoggedUser } from '../../../actions/auth.action';
import { getEleves, getEvents } from '../../../actions/get.action';

const getNotEvaluated = eleves => {
    const { uid } = getLoggedUser();
    const filteredKeysEleves12AndMoreHoursPast = _.filter(Object.keys(eleves), key => _.filter(eleves[key].planning ? eleves[key].planning : {}, p => new Date(p.date) < new Date()).length >= 12 && _.filter(eleves[key].planning ? eleves[key].planning : {}, p => new Date(p.date) >= new Date()).length >= 1); 
    const filteredKeys = _.filter(filteredKeysEleves12AndMoreHoursPast, key => _.orderBy(Object.values(eleves[key].planning), p => new Date(p.date).getTime())[12].moniteur === uid);
    let notEvaluated = "";
    filteredKeys.forEach(key => {
        if (!eleves[key].estimations || Object.values(eleves[key].estimations).length === 0) notEvaluated = key;
    });
    return notEvaluated;
};

class Planning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            errorMsg: "",
            eleveDimmedName: "",
            eleveDimmedKey: "",
        };
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getEleves().then(eleves => {
            const eleveDimmedKey = getNotEvaluated(eleves);
            const eleveDimmedName = eleveDimmedKey ? `${eleves[eleveDimmedKey].dossier.eleve.nom} ${eleves[eleveDimmedKey].dossier.eleve.prenom}` : "";
            getEvents(uid, "moniteur").then(eventsWithDateString => {
                const events = [];
                eventsWithDateString.forEach(event => {
                    events.push(Object.assign(event, {
                        start: new Date(event.start),
                        end: new Date(event.end),
                    }));
                });
                this.setState({
                    events,
                    eleveDimmedKey,
                    eleveDimmedName,
                    errorMsg: "",
                    loading: false,
                });
            }).catch(err => this.setState({ errorMsg: err.message, loading: false }));
        });
    }

    render() {
        return (
            <Dimmer.Dimmable blurring as="div" dimmed={this.state.eleveDimmedKey.length !== 0}>
                <Segment inverted fluid padded attached color="orange">
                    <Header
                        as="h2"
                        icon="calendar"
                        content="Planning"
                        subheader="Calendrier de vos heures"
                    />
                </Segment>
                <br />
                <Container>
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
                </Container>
                <DimmerContent
                    eleveName={this.state.eleveDimmedName}
                    eleveKey={this.state.eleveDimmedKey}
                />
            </Dimmer.Dimmable>
        );
    }
}

Planning.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Planning