// React
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Local requirement
import Home from '../views/home/';
import Dossier from '../views/dossier/';
import Boutique from '../views/boutique/';
import Panier from '../views/panier/';
import Code from '../views/code/';
import Conduite from '../views/conduite/';
import Examen from '../views/examen/';
import Compte from '../views/compte/';
import Financer from '../views/financer/';
import Informations from '../views/informations/';

const Routes = () => (
    <Switch>
        <Route path='/eleve/home' component={Home} />
        <Route path='/eleve/dossier' component={Dossier} />
        <Route path='/eleve/boutique' component={Boutique} />
        <Route path='/eleve/panier' component={Panier} />
        <Route path='/eleve/code' component={Code} />
        <Route path='/eleve/conduite' component={Conduite} />
        <Route path='/eleve/examen' component={Examen} />
        <Route path='/eleve/compte' component={Compte} />
        <Route path='/eleve/financer' component={Financer} />
        <Route path='/eleve/informations' component={Informations} />
        <Redirect to='/eleve/home' />
    </Switch>
);

export default Routes;