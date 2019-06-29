// React requirement
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Local requirement
import MenuPermis from './components/menuPermis.component';
import PermisManuel from './views/permisManuel';
import PermisAutomatique from './views/permisAutomatique';
import PermisAnnulation from './views/permisAnnulation';
import PermisConduiteAccompagnee from './views/permisConduiteAccompagnee';

const ForfaitsPermis = () => (
    <div>
        <MenuPermis />
        <Switch>
            <Route path='/home/forfaitsPermis/permisManuel' component={PermisManuel} />
            <Route path='/home/forfaitsPermis/permisAutomatique' component={PermisAutomatique} />
            <Route path='/home/forfaitsPermis/annulationPermis' component={PermisAnnulation} />
            <Route path='/home/forfaitsPermis/conduiteAccompagnee' component={PermisConduiteAccompagnee} />
            <Redirect to='/home/forfaitsPermis/permisManuel' />
        </Switch>
    </div>
);

ForfaitsPermis.propTypes = {};

export default ForfaitsPermis;