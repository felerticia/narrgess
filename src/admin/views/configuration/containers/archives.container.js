// React
import React from 'react';
import { Segment, Header, Label, Button, Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import Admins from '../components/archives/admins/';
import Eleves from '../components/archives/eleves/';
import Moniteurs from '../components/archives/moniteurs/';
import Secretaires from '../components/archives/secretaires/';

const Archives = props => (
    <div>
        <Segment raised padded>
            <Label
                as='a'
                size='large'
                icon='arrow left'
                attached='top left'
                onClick={() => props.history.push('/admin/configuration')}
            />
            <Header as='h2' textAlign='center'>Archives</Header>
            <Segment padded raised color='orange'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                            <Button
                                fluid
                                color='orange'
                                size='big'
                                icon='user circle'
                                content='Administrateurs'
                                onClick={() => props.history.push('/admin/configuration/archives/admins')}
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                            <Button
                                fluid
                                color='orange'
                                size='big'
                                icon='user'
                                content='Eleves'
                                onClick={() => props.history.push('/admin/configuration/archives/eleves')}
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                            <Button
                                fluid
                                color='orange'
                                size='big'
                                icon='user outline'
                                content='Moniteurs'
                                onClick={() => props.history.push('/admin/configuration/archives/moniteurs')}
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                            <Button
                                fluid
                                color='orange'
                                size='big'
                                icon='user circle outline'
                                content='Chargés'
                                onClick={() => props.history.push('/admin/configuration/archives/secretaires')}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Segment>
        <Switch>
            <Route path='/admin/configuration/archives/admins' component={Admins} />
            <Route path='/admin/configuration/archives/eleves' component={Eleves} />
            <Route path='/admin/configuration/archives/moniteurs' component={Moniteurs} />
            <Route path='/admin/configuration/archives/secretaires' component={Secretaires} />
        </Switch>
    </div>
);

Archives.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Archives;
