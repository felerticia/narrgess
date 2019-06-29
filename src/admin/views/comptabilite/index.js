// React
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import Menu from './containers/menu.container';
import Ventes from './containers/ventes.container';
import Encaissements from './containers/encaissements.container';
import Impayes from './containers/impayes.container';
import Remboursements from './containers/remboursements.container';
import Factures from './containers/factures.container';
import ActivitesEleves from './containers/activitesEleves.container';
import ActivitesMoniteurs from './containers/activitesMoniteurs.container';

const Comptabilite = () => (
    <Container>
        <Switch>
            <Route path='/admin/comptabilite/menu' component={Menu} />
            <Route path='/admin/comptabilite/ventes' component={Ventes} />
            <Route path='/admin/comptabilite/encaissements' component={Encaissements} />
            <Route path='/admin/comptabilite/impayes' component={Impayes} />
            <Route path='/admin/comptabilite/remboursements' component={Remboursements} />
            <Route path='/admin/comptabilite/factures' component={Factures} />
            <Route path='/admin/comptabilite/eleves' component={ActivitesEleves} />
            <Route path='/admin/comptabilite/moniteurs' component={ActivitesMoniteurs} />
            <Redirect to='/admin/comptabilite/menu' />
        </Switch>
    </Container>
);

export default Comptabilite;
