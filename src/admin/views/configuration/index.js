// React
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local
import Menu from './containers/menu.container';
import TypesRDV from './containers/typesRDV.container';
import LieuxRDV from './containers/lieuxRDV.container';
import Admins from './containers/admins.container';
import Secretaires from './containers/secretaires.container';
import Moniteurs from './containers/moniteurs.container';
import Archives from './containers/archives.container';
import Contrats from './containers/contrats.container';
import Boutique from './containers/boutique.container';
import Etablissements from './containers/etablissements.container';

const Configuration = () => (
    <Container>
        <Switch>
            <Route path='/admin/configuration/menu' component={Menu} />
            <Route path='/admin/configuration/typesRDV' component={TypesRDV} />
            <Route path='/admin/configuration/lieuxRDV' component={LieuxRDV} />
            <Route path='/admin/configuration/admins' component={Admins} />
            <Route path='/admin/configuration/secretaires' component={Secretaires} />
            <Route path='/admin/configuration/moniteurs' component={Moniteurs} />
            <Route path='/admin/configuration/archives' component={Archives} />
            <Route path='/admin/configuration/contrats' component={Contrats} />
            <Route path='/admin/configuration/boutique' component={Boutique} />
            <Route path='/admin/configuration/etablissements' component={Etablissements} />
            <Redirect to='/admin/configuration/menu' />
        </Switch>
    </Container>
);

export default Configuration;
