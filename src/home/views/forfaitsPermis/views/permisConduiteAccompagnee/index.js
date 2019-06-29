// React requirement
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Local requirement
import PermisConduiteAccompagnee from './permisConduiteAccompagnee.component';
import PermisConduiteAccompagneePlus from './permisConduiteAccompagneePlus.component';

// Style
import Style from '../../styles/index.style';

const ForfaitsPermisAnnulation = () => (
    <div style={Style.container}>
        <Grid>
            <Grid.Column computer={8} tablet={8} mobile={16} textAlign="center">
                <PermisConduiteAccompagnee />
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16} textAlign="center">
                <PermisConduiteAccompagneePlus />
            </Grid.Column>
        </Grid>
    </div>
);

ForfaitsPermisAnnulation.propTypes = {};

export default ForfaitsPermisAnnulation;