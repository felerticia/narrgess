// React
import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

// Local
import MenuComponent from '../components/menu.component';
import CAChart from '../components/caChart.component';
import LieuxChart from '../components/lieuxChart.component';

const Menu = () => (
    <Segment raised padded>
        <Header as='h2' textAlign='center'>Analyses</Header>
        <MenuComponent />
        <CAChart />
        <LieuxChart />
    </Segment>
);

export default Menu;
