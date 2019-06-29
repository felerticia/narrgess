// React
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router';

// Local
import PresentationForfait from './components/presentationForfait.component';
import Steps from './components/steps.component';

// Style
import Style from './styles/index.style';

// data
import PreInscriptionData from './data';

const PreInscription = props => (
    <Grid style={Style.column}>
        <Grid.Row stretched verticalAlign="middle" style={Style.row}>
            <Grid.Column computer={4} tablet={6} mobile={16} style={Style.column}>
                <PresentationForfait data={PreInscriptionData[props.match.params.forfait]} />
            </Grid.Column>
            <Grid.Column computer={12} tablet={10} mobile={16} style={Style.column}>
                <Steps forfait={props.match.params.forfait} />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

PreInscription.propTypes = {
    match: PropTypes.object,
};

export default withRouter(PreInscription);