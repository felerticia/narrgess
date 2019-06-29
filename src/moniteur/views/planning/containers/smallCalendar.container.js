// React
import React from 'react';
import { Label, Divider, Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
        _.orderBy(_.filter(props.events, e => e.start.getTime() + 3600*1000 >= new Date().getTime()), e => e.start.getTime(), ['asc']).map((event, key) => (
            // eslint-disable-next-line
            (event.title && event.title !== "Jour férié" && !event.title.includes("Indisponilité")) || !event.title &&
            <div key={key}>
                {event.typeRDV && <Label style={{ backgroundColor: event.color }} content={event.typeRDV.nom} />}{" "}
                <Label icon="calendar" content={`${date2DMY(event.start)} - ${date2HM(event.start)} à ${date2HM(event.end)}`} />
                <br />
                <Icon name="map marker" />{" "}
                {event.lieuxRDV && <span>{event.lieuxRDV.nom} : {event.lieuxRDV.adresse}</span>}{event.lieuxRDV && <span> - </span>}
                <br />
                <Icon name="user" />{" "}
                {event.eleve && <span>{event.eleve.dossier.eleve.nom} {event.eleve.dossier.eleve.prenom}</span>}
                <br />
                <Button
                    fluid inverted color="blue"
                    content="Livret pédagogique"
                    onClick={() => props.history.push(`/moniteur/eleves/${event.eleveId}/competences`)}
                />
                <Divider />
            </div>
        ))
    }
    </div>
);

SmallCalendar.propTypes = {
    events: PropTypes.array,
    history: PropTypes.object,
};

export default withRouter(SmallCalendar);