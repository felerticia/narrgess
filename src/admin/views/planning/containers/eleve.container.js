// React
import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import Planning from '../../eleves/containers/eleveContainers/planning.container';
import Compte from '../../eleves/containers/eleveContainers/compte.container';

const Eleve = props => (
    <Grid centered columns={2} divided stackable>
        <Grid.Row>
            <Grid.Column>
                <Planning {...props} />
            </Grid.Column>
            <Grid.Column>
                <Compte {...props} />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

Eleve.propTypes = {
    eleve: PropTypes.string,
    match: PropTypes.object,
};

export default Eleve;
