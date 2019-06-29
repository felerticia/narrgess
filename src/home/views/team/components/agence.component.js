// React
import React from 'react';
import { Grid, Image, Header, Segment, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Agence = props => (
    <Segment raised color="orange">
        <Grid>
            <Grid.Column computer={4} tablet={8} mobile={16}>
                <Image
                    centered size="small"
                    bordered={false} src={props.image}
                />
            </Grid.Column>
            <Grid.Column computer={4} tablet={8} mobile={16}>
                <Header as="h4" color="orange" content="ConduiteCenter" />
                <Header as="h2" content={props.agenceCity} />
                <Divider style={{ width: "5em" }} />
                <b>{props.responsableName}</b><br />
                <span>Responsable d’agence</span>
            </Grid.Column>
            <Grid.Column computer={4} tablet={8} mobile={16}>
                <Header as="h4" color="orange" content={`Agence ${props.agenceName}`} />
                <span>{props.agenceAddress1}</span><br />
                <span>{props.agenceAddress2}</span><br />
                <br />
                <b>Tél. : {props.agenceTel}</b>
            </Grid.Column>
            <Grid.Column computer={4} tablet={8} mobile={16}>
                <Header as="h4" color="orange" content="Horaires d’ouverture" />
                <b>Code et secrétariat</b><br />
                <span>{props.horairesCode}</span><br />
                <b>Conduite</b><br />
                <span>{props.horairesConduite}</span>
            </Grid.Column>
        </Grid>
    </Segment>
);

Agence.propTypes = {
    image: PropTypes.string,
    agenceCity: PropTypes.string,
    agenceName: PropTypes.string,
    agenceAddress1: PropTypes.string,
    agenceAddress2: PropTypes.string,
    agenceTel: PropTypes.string,
    responsableName: PropTypes.string,
    horairesCode: PropTypes.string,
    horairesConduite: PropTypes.string,
};

export default Agence;