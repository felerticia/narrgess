// React requirement
import React from 'react';
import { Grid, Responsive } from 'semantic-ui-react'

// Local
import Sidebar from './general/sidebar/';
import Routes from './general/routes';

// Style
import Style from './style';

const Moniteur = () => (
    <Grid>
        <Grid.Row style={Style.Row}>
            <Grid.Column width={3} style={Style.LeftColumn}>
                <Responsive
                    as={Sidebar.Laptop}
                    minWidth={1024}
                />
                <Responsive
                    as={Sidebar.Tablet}
                    maxWidth={1023}
                />
            </Grid.Column>
            <Grid.Column width={13} style={Style.RightColumn}>
                <Routes />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default Moniteur;