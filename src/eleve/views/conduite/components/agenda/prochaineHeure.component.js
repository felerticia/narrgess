// React
import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import HeureDisp from './heureDisp.component';

const ProchaineHeure = props => (
    props.planning.length > 0 ?
    <HeureDisp
        title="Prochaine heure prévue"
        color="info"
        size="small"
        heure={props.planning[0]}
        lieuxRDV={props.lieuxRDV}
        moniteurs={props.moniteurs}
    /> :
    <div>
        <Icon name="meh" />{" "}
        <span>Vous n'avez pas de cours prévu pour l'instant</span>
    </div>
);

ProchaineHeure.propTypes = {
    planning: PropTypes.array,
    moniteurs: PropTypes.object,
    lieuxRDV: PropTypes.object,
}

export default ProchaineHeure;