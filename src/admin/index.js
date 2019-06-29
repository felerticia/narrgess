// React requirement
import React from 'react';
import { Menu, Icon, Button, Container } from 'semantic-ui-react'
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local requirement
import Planning from './views/planning/';
import Eleves from './views/eleves/';
import Examens from './views/examens/';
import Analyses from './views/analyses/';
import Comptabilite from './views/comptabilite/';
import Configuration from './views/configuration/';

// actions
import { signOut } from '../actions/auth.action';

const Admin = props => (
    <div>
        <Menu stackable inverted fluid borderless size='massive'>
            {
                props.userLevel >= 0 &&
                <Menu.Item
                    name='planning'
                    active={props.location.pathname.split('/')[2] === 'planning'}
                    onClick={() => props.history.push('/admin/planning')}
                >
                    <Icon name='calendar' />
                    Planning
                </Menu.Item>   
            }
            {
                props.userLevel >= 0 &&
                <Menu.Item
                    name='eleves'
                    active={props.location.pathname.split('/')[2] === 'eleves'}
                    onClick={() => props.history.push('/admin/eleves')}
                >
                    <Icon name='user' />
                    Elèves
                </Menu.Item>
            }
            {
                props.userLevel >= 0 &&
                <Menu.Item
                    name='examens'
                    active={props.location.pathname.split('/')[2] === 'examens'}
                    onClick={() => props.history.push('/admin/examens')}
                >
                    <Icon name='student' />
                    Examens
                </Menu.Item>
            }
            {
                props.userLevel >= 1 &&
                <Menu.Item
                    name='analyses'
                    active={props.location.pathname.split('/')[2] === 'analyses'}
                    onClick={() => props.history.push('/admin/analyses')}
                >
                    <Icon name='chart bar' />
                    Analyses
                </Menu.Item>
            }
            {
                props.userLevel >= 1 &&
                <Menu.Item
                    name='comptabilité'
                    active={props.location.pathname.split('/')[2] === 'comptabilite'}
                    onClick={() => props.history.push('/admin/comptabilite')}
                >
                    <Icon name='calculator' />
                    Comptabilité
                </Menu.Item>
            }
            {
                props.userLevel >= 1000 &&
                <Menu.Item
                    name='configuration'
                    active={props.location.pathname.split('/')[2] === 'configuration'}
                    onClick={() => props.history.push('/admin/configuration')}
                >
                    <Icon name='cogs' />
                    Configuration
                </Menu.Item>
            }
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Button
                        negative
                        icon='power'
                        content='Déconnexion'
                        size='massive'
                        onClick={signOut}
                    />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        <Container fluid>
            <Switch>
                {props.userLevel >= 0 && <Route path='/admin/planning' component={Planning} />}
                {props.userLevel >= 0 && <Route path='/admin/eleves' component={p => <Eleves {...p} type={props.type} />} />}
                {props.userLevel >= 0 && <Route path='/admin/examens' component={Examens} />}
                {props.userLevel >= 1 && <Route path='/admin/comptabilite' component={Comptabilite} />}
                {props.userLevel >= 1 && <Route path='/admin/analyses' component={Analyses} />}
                {props.userLevel >= 1000 && <Route path='/admin/configuration' component={Configuration} />}
                <Redirect to='/admin/planning' />
            </Switch>
        </Container>
    </div>
);

Admin.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    userLevel: PropTypes.number,
};

export default Admin;