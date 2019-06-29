// React
import React from 'react';
import { Segment, Header, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const Menu = props => (
    <Segment padded raised color='orange'>
        <Header>Outils d'analyse</Header>
        <Grid>
            <Grid.Row>
                <Grid.Column textAlign='center' computer={8} largeScreen={8} tablet={8} widescreen={8} mobile={16}>
                    <Button
                        fluid
                        color='orange'
                        size='big'
                        icon='map marker'
                        content='Lieux de RDV'
                        onClick={() => props.history.push('/admin/analyses/lieuxRDV')}
                    />
                </Grid.Column>
                <Grid.Column textAlign='center' computer={8} largeScreen={8} tablet={8} widescreen={8} mobile={16}>
                    <Button
                        fluid
                        color='orange'
                        size='big'
                        icon='user'
                        content='Moniteurs'
                        onClick={() => props.history.push('/admin/analyses/moniteurs')}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign='center' computer={8} largeScreen={8} tablet={8} widescreen={8} mobile={16}>
                    <Button
                        fluid
                        color='orange'
                        size='big'
                        icon='user close'
                        content='Absences'
                        onClick={() => props.history.push('/admin/analyses/absences')}
                    />
                </Grid.Column>
                <Grid.Column textAlign='center' computer={8} largeScreen={8} tablet={8} widescreen={8} mobile={16}>
                    <Button
                        fluid
                        color='orange'
                        size='big'
                        icon='chart line'
                        content="Estimations heures supplémentaires"
                        onClick={() => props.history.push('/admin/analyses/estimations')}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
);

Menu.propTypes = {
    history: PropTypes.object,
}

export default withRouter(Menu);
