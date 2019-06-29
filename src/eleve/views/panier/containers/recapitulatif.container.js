// React
import React, { Component } from 'react';
import { Segment, Header, Grid, Button, Responsive } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getBoutiques, getElevePanier } from '../../../../actions/get.action';
import { editElevePanierProduct } from '../../../../actions/edit.action';
import { deleteElevePanierProduct } from '../../../../actions/delete.action';

class Recapitulatif extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            panier: {},
            boutique: {},
            loadingBoutique: true,
            loadingPanier: true,
        };

        this.fetchData = this.fetchData.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.clickPlus = this.clickPlus.bind(this);
        this.clickMinus = this.clickMinus.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData()
        getBoutiques().then(boutique => this.setState({ boutique, loadingBoutique: false }));
    }

    fetchData() {
        const { uid } = getLoggedUser();
        this.setState({ loadingPanier: true });
        getElevePanier(uid).then(panier => this.setState({ panier, loadingPanier: false }));
    }

    getTotal() {
        let total = 0;
        Object.keys(this.state.panier).forEach(productId => {
            const prix = this.state.boutique[productId] ? this.state.boutique[productId].prix : 0;
            total += this.state.panier[productId]*prix;
        });
        return total;
    }

    clickPlus(productId) {
        const { uid } = getLoggedUser();
        const { panier } = this.state;
        editElevePanierProduct(uid, productId, panier[productId]+1).then(() => this.fetchData());
    }

    clickMinus(productId) {
        const { uid } = getLoggedUser();
        const { panier } = this.state;
        if (panier[productId] === 1) deleteElevePanierProduct(uid, productId).then(() => this.fetchData());
        else editElevePanierProduct(uid, productId, panier[productId]-1).then(() => this.fetchData());
        
    }

    render() {
        return (
            <Segment loading={this.state.loadingPanier || this.state.loadingBoutique}>
                <Header dividing as="h2" color="orange" content="Récapitulatif" />
                {
                    Object.keys(this.state.panier).length === 0 ? <Header textAlign="center" as="h2" content="Tu n'as rien dans ton panier" /> :
                    <Grid divided='vertically'>
                    {
                        Object.keys(this.state.panier).map(productId => {
                            const product = this.state.boutique[productId] ? this.state.boutique[productId] : {};
                            return (
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column computer={6} tablet={9}>
                                        <Header content={product.nom} />
                                    </Grid.Column>
                                    <Grid.Column computer={4} tablet={7}>
                                        <b>
                                            {product.versements > 1 ? Math.round(product.prix/product.versements*100)/100 : product.prix} €
                                            {product.versements > 1 && <sup>x{product.versements}</sup>}
                                        </b>
                                    </Grid.Column>
                                    <Grid.Column computer={6} tablet={16}>
                                        <Button.Group fluid>
                                            <Button icon="minus" color="orange" onClick={() => this.clickMinus(productId)} />
                                            <Button disabled compact content={this.state.panier[productId]} />
                                            <Button icon="add" color="orange" onClick={() => this.clickPlus(productId)} />
                                        </Button.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            );
                        })
                    }
                    </Grid>
                }
                <Header dividing style={{ padding: "0", margin: "0", marginBottom: "10px" }} color="orange" />
                <Grid>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column computer={8} tablet={16}>
                            <Button
                                fluid
                                color="orange"
                                content="Compléter ma commande"
                                onClick={() => this.props.history.push("/eleve/boutique")}
                            />
                        </Grid.Column>
                        <Responsive
                            as={() => <Grid.Column width={16}><br /></Grid.Column>}
                            maxWidth={1023}
                        />
                        <Grid.Column computer={4} tablet={8}>
                            <Header content="TOTAL" textAlign="right" />
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8}>
                            <Header content={`${this.getTotal()} €`} textAlign="left" color="orange" />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

Recapitulatif.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Recapitulatif);