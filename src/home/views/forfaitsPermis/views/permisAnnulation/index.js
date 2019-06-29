// React requirement
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Local requirement
import PermisCode from './permisCode.component';
import PermisCodeEtConduite from './permisCodeEtConduite.component';

// Style
import Style from '../../styles/index.style';

const ForfaitsPermisAnnulation = () => (
    <div style={Style.container}>
        <Grid>
            <Grid.Column computer={8} tablet={8} mobile={16} textAlign="center">
                <PermisCode />
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16} textAlign="center">
                <PermisCodeEtConduite />
            </Grid.Column>
        </Grid>
    </div>
);

ForfaitsPermisAnnulation.propTypes = {};

export default ForfaitsPermisAnnulation;