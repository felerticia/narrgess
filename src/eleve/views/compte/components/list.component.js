// React
import React from 'react';
import { Segment, Grid, Button, Header, Label, Divider, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const date2time = dateString => {
    const day = dateString.split("/")[0];
    const month = dateString.split("/")[1];
    const year = dateString.split("/")[2];
    const date = new Date(year, month-1, day);
    return date.getTime();
}

const List = props => (
    _.orderBy(props.ventes, vente => date2time(vente.date), ["desc"]).length === 0 ? <Header block as="h2" textAlign="center" content="Tu n'as encore rien acheté" /> :
    <Segment basic>
        <Divider /><br />
        {
            _.orderBy(props.ventes, vente => date2time(vente.date), ["desc"]).map((vente, key) => (
                <Grid key={key}>
                    <Grid.Row verticalAlign="middle" style={{ padding: '5px' }}>
                        <Grid.Column computer={4} tablet={7}>
                            <Label content={vente.date} color="orange" />
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={9}>
                            <Header content={props.boutique[vente.produit] ? props.boutique[vente.produit].nom : vente.produit.nom} textAlign="left" />
                        </Grid.Column>
                        <Responsive
                            as={() => <Grid.Column width={16}><br /></Grid.Column>}
                            maxWidth={1023}
                        />
                        <Grid.Column computer={6} tablet={16}>
                            <Button
                                primary fluid
                                icon="file pdf outline"
                                content={props.buttonTitle}
                                onClick={() => props.handleClick(vente)}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '5px' }}>
                        <Grid.Column width={16}>
                            <Divider />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            ))
        }
    </Segment>
);

List.propTypes = {
    ventes: PropTypes.any,
    boutique: PropTypes.object,
    buttonTitle: PropTypes.string,
    handleClick: PropTypes.func,
};

export default List