// React
import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

const HeureDisp = props => {
    const date = new Date(props.heure.date)
    const lieuxRDV = props.lieuxRDV[props.heure.lieuxRDV];
    const moniteur = props.moniteurs[props.heure.moniteur];
    return (
        <Message icon={props.icon ? true : false} floating={props.floating} color={props.color} size={props.size}>
            {props.icon && <Icon name={props.icon} />}
            <Message.Content>
                { props.title && <Message.Header>{props.title}</Message.Header> }
                <span>
                    <Icon name="calendar" />
                    Le {addZero(date.getDate())}/{addZero(date.getMonth()+1)}/{date.getFullYear()}{" - "}
                    De {addZero(date.getHours())}h{addZero(date.getMinutes())}{" "}
                    à {addZero(date.getHours()+1)}h{addZero(date.getMinutes())}
                </span>
                <br />
                <span>
                    { lieuxRDV && <Icon name="map marker" /> }
                    { lieuxRDV && <span>{lieuxRDV.nom}: {lieuxRDV.adresse}</span> }
                </span>
                <br />
                <span>
                    { moniteur && <Icon name="user circle" /> }
                    { moniteur && <span>{moniteur.nom} {moniteur.prenom}</span> }
                </span>
            </Message.Content>
        </Message>
    );
}

HeureDisp.propTypes = {
    heure: PropTypes.object,
    moniteurs: PropTypes.object,
    lieuxRDV: PropTypes.object,
    title: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.string,
}

export default HeureDisp;