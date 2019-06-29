// React
import React from 'react';
import { Segment, Header, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Menu = props => (
    <Segment raised padded>
        <Header as='h2' textAlign='center'>Comptabilité</Header>
        <Segment padded raised color='orange'>
            <Header>Gestion de ma trésorerie</Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign='center' computer={4} largeScreen={4} tablet={4} widescreen={4} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='shop'
                            content='Ventes'
                            onClick={() => props.history.push('/admin/comptabilite/ventes')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={4} largeScreen={4} tablet={4} widescreen={4} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='payment'
                            content='Encaissements'
                            onClick={() => props.history.push('/admin/comptabilite/encaissements')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={4} largeScreen={4} tablet={4} widescreen={4} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='wait'
                            content='Impayés'
                            onClick={() => props.history.push('/admin/comptabilite/impayes')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={4} largeScreen={4} tablet={4} widescreen={4} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='redo'
                            content='Remboursements'
                            onClick={() => props.history.push('/admin/comptabilite/remboursements')}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        <Segment padded raised color='orange'>
            <Header>Gestion de mes activités</Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column textAlign='center' computer={5} largeScreen={5} tablet={5} widescreen={5} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='file text outline'
                            content='Historique des factures'
                            onClick={() => props.history.push('/admin/comptabilite/factures')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={6} largeScreen={6} tablet={6} widescreen={6} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='user'
                            content='Activités des élèves'
                            onClick={() => props.history.push('/admin/comptabilite/eleves')}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign='center' computer={5} largeScreen={5} tablet={5} widescreen={5} mobile={16}>
                        <Button
                            fluid
                            color='orange'
                            size='big'
                            icon='user circle outline'
                            content='Activités des moniteurs'
                            onClick={() => props.history.push('/admin/comptabilite/moniteurs')}
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
