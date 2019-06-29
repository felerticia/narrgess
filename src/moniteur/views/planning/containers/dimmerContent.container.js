// React
import React from 'react';
import { Dimmer, Segment, Header, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const DimmerContent = props => (
    <Dimmer active={props.eleveKey.length !== 0}>
        <Segment color="orange">
            <Header as='h2' icon textAlign='center'>
                <Icon name="warning sign" />
                <Header.Content>Pour afficher votre planning, il faut tout d'abord donner une estimation pour l'élève <i>{props.eleveName}</i></Header.Content>
            </Header>
            <Button
                fluid positive
                icon="add"
                content="Faire une estimation"
                onClick={() => props.history.push(`/moniteur/eleves/${props.eleveKey}/estimation`)}
            />
        </Segment>
    </Dimmer>
);

DimmerContent.propTypes = {
    eleveName: PropTypes.string,
    eleveKey: PropTypes.string,
    history: PropTypes.object,
};

export default withRouter(DimmerContent);