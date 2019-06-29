// React requirement
import React from 'react';
import { Grid } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom';

// Local requirement
import LoginForm from './containers/loginForm.container';
import Forgot from './containers/forgot.container';
import SignIn from './containers/signIn.container';

// Style
import Style from './styles/index.style';

const Login = () => (
    <Grid textAlign="center" verticalAlign="middle" style={Style.grid}>
        <Grid.Column computer={8} tablet={16}>
            <Switch>
                <Route path='/login' component={LoginForm} />
                <Route path='/forgot' component={Forgot} />
                <Route path='/signin' component={SignIn} />
            </Switch>
        </Grid.Column>
    </Grid>
);

export default Login;