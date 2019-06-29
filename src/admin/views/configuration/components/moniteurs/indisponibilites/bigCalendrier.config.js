// React
import React from 'react';
import { Icon } from 'semantic-ui-react';

/////////////// UTILS ///////////////

const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const addZero = number => number < 10 ? `0${number}` : `${number}`;

/////////////// MESSAGES ///////////////

export const messages = {
    allDay: "",
    previous: <Icon name='chevron left' />,
    next: <Icon name='chevron right' />,
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "agenda",
};

/////////////// FORMATS ///////////////

export const formats = {
    dayFormat: date => `${days[date.getDay()]} ${addZero(date.getDate())}/${addZero(date.getMonth()+1)}`,
    weekdayFormat: date => `${days[date.getDay()]}`,
    timeGutterFormat: date => `${addZero(date.getHours())}:${addZero(date.getMinutes())}`,
    monthHeaderFormat: date => `${months[date.getMonth()]} ${date.getFullYear()}`,
    dayRangeHeaderFormat: ({ start, end }) => `${addZero(start.getDate())} ${months[start.getMonth()]} - ${addZero(end.getDate())} ${months[end.getMonth()]}`,
    dayHeaderFormat: date => `${days[date.getDay()]} ${addZero(date.getDate())} ${months[date.getMonth()]}`,
    eventTimeRangeFormat: ({ start, end }) => `${addZero(start.getHours())}:${addZero(start.getMinutes())} - ${addZero(end.getHours())}:${addZero(end.getMinutes())}`,
};

/////////////// MIN-MAX ///////////////

export const getMinHour = currentDate => {
    const minHour = new Date();
    minHour.setFullYear(currentDate.getFullYear());
    minHour.setMonth(currentDate.getMonth());
    minHour.setDate(currentDate.getDate());
    minHour.setHours(6); minHour.setMinutes(0); minHour.setSeconds(0);
    return minHour;
};

export const getMaxHour = currentDate => {
    const maxHour = new Date();
    maxHour.setFullYear(currentDate.getFullYear());
    maxHour.setMonth(currentDate.getMonth());
    maxHour.setDate(currentDate.getDate());
    maxHour.setHours(22); maxHour.setMinutes(31); maxHour.setSeconds(0);
    return maxHour;
};
