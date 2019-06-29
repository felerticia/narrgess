// React
import React from 'react';
import { Label, Divider, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

const date2DMY = date => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${addZero(day)}/${addZero(month+1)}/${year}`
};

const date2HM = date => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${addZero(hour)}:${addZero(minute)}`;
}

const SmallCalendar = props => (
    <div>
    {
        _.orderBy(_.filter(props.events, e => e.start >= new Date()), e => e.start.getTime(), ['asc']).map((event, key) => (
            event.title !== "Jour férié" &&
            <div key={key}>
                {event.typeRDV && <Label style={{ backgroundColor: event.color }} content={event.typeRDV.nom} />}{" "}
                <Label icon="calendar" content={`${date2DMY(event.start)} - ${date2HM(event.start)} à ${date2HM(event.end)}`} />
                <br />
                <Icon name="map marker" />{" "}
                {event.lieuxRDV && <span>{event.lieuxRDV.nom} : {event.lieuxRDV.adresse}</span>}{event.lieuxRDV && <span> - </span>}
                <br />
                <Icon name="user" />{" "}
                {event.moniteur && <span>{event.moniteur.nom} {event.moniteur.prenom}</span>}
                <Divider />
            </div>
        ))
    }
    </div>
);

SmallCalendar.propTypes = {
    events: PropTypes.array,
};

export default SmallCalendar;