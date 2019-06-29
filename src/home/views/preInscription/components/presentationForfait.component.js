// React
import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Style
import Style from '../styles/presentationForfait.style';

const PresentationForfait = props => (
    <Segment inverted attached padded textAlign="center" style={Style.segment}>
        <Header
            inverted as="h2"
            content={`Forfait ${props.data.type}`}
        />
        <Header
            inverted
            as="h2" color="orange"
            content={props.data.name}
            subheader={props.data.description}
        />
        <Header
            inverted
            as="h2" color="black"
            content={<span>{props.data.pricePerVersement}€ <sub>x{props.data.versements}</sub></span>}
            subheader={`Soit un total de ${props.data.price}€`}
        />
    </Segment>
);

PresentationForfait.propTypes = {
    data: PropTypes.object,
};

export default PresentationForfait;