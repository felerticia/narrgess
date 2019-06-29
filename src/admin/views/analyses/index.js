// React
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import Menu from './containers/menu.container';
import LieuxRDV from './containers/lieuxRDV.container';
import Moniteurs from './containers/moniteurs.container';
import Absences from './containers/absences.container';
import Estimations from './containers/estimations.container';

const Comptabilite = () => (
    <Container>
        <Switch>
            <Route path='/admin/analyses/menu' component={Menu} />
            <Route path='/admin/analyses/lieuxRDV' component={LieuxRDV} />
            <Route path='/admin/analyses/moniteurs' component={Moniteurs} />
            <Route path='/admin/analyses/absences' component={Absences} />
            <Route path='/admin/analyses/estimations' component={Estimations} />
            <Redirect to='/admin/analyses/menu' />
        </Switch>
    </Container>
);

export default Comptabilite;
