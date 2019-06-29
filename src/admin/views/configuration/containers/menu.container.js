// React
import React from 'react';
import { Segment, Header, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Menu = props => (
    <Segment raised padded>
        <Header as='h2' textAlign='center'>Configuration</Header>
        <Segment padded raised color='orange'>
            <Header>Paramétres planning</Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign='center' computer={8} tablet={8} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='sitemap'
                            content='Types de RDV'
                            onClick={() => props.history.push('/admin/configuration/typesRDV')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={8} tablet={8} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='marker'
                            content='Lieux de RDV'
                            onClick={() => props.history.push('/admin/configuration/lieuxRDV')}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment padded raised color='orange'>
            <Header>Paramètres utilisateurs</Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='user circle'
                            content='Administrateurs'
                            onClick={() => props.history.push('/admin/configuration/admins')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='user circle outline'
                            content='Chargés'
                            onClick={() => props.history.push('/admin/configuration/secretaires')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='user outline'
                            content='Moniteurs'
                            onClick={() => props.history.push('/admin/configuration/moniteurs')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={4} tablet={8} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='archive'
                            content='Archives'
                            onClick={() => props.history.push('/admin/configuration/archives')}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment padded raised color='orange'>
            <Header>Autres paramètres</Header>
            <Grid>
                <Grid.Row>
                <Grid.Column textAlign='center' computer={5} tablet={5} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='signup'
                            content='Contrats'
                            onClick={() => props.history.push('/admin/configuration/contrats')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={6} tablet={6} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='shop'
                            content='Boutique'
                            onClick={() => props.history.push('/admin/configuration/boutique')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={5} tablet={5} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='building'
                            content='Etablissements'
                            onClick={() => props.history.push('/admin/configuration/etablissements')}
                        />
                    </Grid.Column>    
                </Grid.Row>
            </Grid>
        </Segment>
    </Segment>
);

Menu.propTypes = {
    history: PropTypes.object,
}

export default Menu;
