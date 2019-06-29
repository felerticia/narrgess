// React requirement
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Local requirement
import PermisPremium from './permisPremium.component';
import PermisAccelere from './permisAccelere.component';
import PermisConnecteCandidatLibre from './permisConnecteCandidatLibre.component';
import PermisCode from './permisCode.component';

// Style
import Style from '../../styles/index.style';

const ForfaitsPermisAutomatique = () => (
    <div style={Style.container}>
        <Grid>
            <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                <PermisConnecteCandidatLibre />
            </Grid.Column>
            <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                <PermisPremium />
            </Grid.Column>
            <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                <PermisAccelere />
            </Grid.Column>
            <Grid.Column computer={4} tablet={8} mobile={16} textAlign="center">
                <PermisCode />
            </Grid.Column>
        </Grid>
    </div>
);

ForfaitsPermisAutomatique.propTypes = {};

export default ForfaitsPermisAutomatique;