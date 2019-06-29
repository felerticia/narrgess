// React
import React, { Component } from 'react';
import { Header, Segment, Grid, Card, Image, Input, Responsive, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getBoutiques } from '../../../../actions/get.action';

// data
import ProduitsData from './produitsData';

class Produits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            payload: "",
            loading: true,
        };

        this.filterSearch = this.filterSearch.bind(this);
        this.filterOther = this.filterOther.bind(this);
        this.filterPrestations = this.filterPrestations.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(data => this.setState({ data, loading: false }));
    }

    filterSearch(key) {
        const produit = this.state.data[key] ? this.state.data[key] : {};
        if (this.state.payload.length === 0) return true;
        const regExp = new RegExp(_.escapeRegExp(this.state.payload), 'i');
        return regExp.test(produit.nom) || regExp.test(produit.prix) || regExp.test(produit.versements);
    }

    filterOther(key) {
        const produitsInData = [];
        const produit = this.state.data[key] ? this.state.data[key] : {};
        Object.values(ProduitsData).forEach(keys => {
            keys.forEach(key => produitsInData.push(key));
        });
        return produit.type === "Forfait" && !produitsInData.find(k => k === key);
    }

    filterPrestations(key) {
        const produit = this.state.data[key] ? this.state.data[key] : {};
        return produit.type === "Prestation";
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Segment>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={12}>
                                <Input
                                    fluid
                                    icon="search"
                                    placeholder="Search..."
                                    value={this.state.payload}
                                    onChange={(_, { value }) => this.setState({ payload: value })}
                                />
                            </Grid.Column>
                            <Grid.Column width={4} textAlign="center">
                                <Responsive
                                    as={() => <Button fluid icon="shopping basket" color="orange" content="Mon panier" onClick={() => this.props.history.push('/eleve/panier')} />}
                                    minWidth={1024}
                                />
                                <Responsive
                                    as={() => <Button fluid color="orange" icon="shopping basket" onClick={() => this.props.history.push('/eleve/panier')} />}
                                    maxWidth={1023}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {
                    Object.keys(ProduitsData).map(type => (
                        <div>
                            <Header block as="h2" content={type} />
                            <Grid>
                                <Grid.Row>
                                {
                                    _.filter(ProduitsData[type], key => this.filterSearch(key)).map(key => (
                                        !(this.state.data[key] && this.state.data[key].showBoutique) ? null :
                                        <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                                            <Card fluid raised color="orange" onClick={() => this.props.history.push(`/eleve/boutique/${key}`)}>
                                                <Image fluid src={this.state.data[key].imageUrl} />
                                                <Card.Content>
                                                    <Card.Header>{this.state.data[key].nom}</Card.Header>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <Card.Header textAlign="center">
                                                        {this.state.data[key].versements > 1 ? Math.round(this.state.data[key].prix/this.state.data[key].versements*100)/100 : this.state.data[key].prix} €
                                                        {this.state.data[key].versements > 1 && <sup>x{this.state.data[key].versements}</sup>}
                                                    </Card.Header>
                                                </Card.Content>
                                            </Card>
                                            <br />
                                        </Grid.Column>
                                    ))
                                }
                                </Grid.Row>
                            </Grid>
                            <br />
                        </div>
                    ))
                }
                <Header block as="h2" content="Autres" />
                <Grid>
                    <Grid.Row>
                    {
                        _.filter(Object.keys(this.state.data), key => this.filterSearch(key) && this.filterOther(key)).map(key => (
                            !(this.state.data[key] && this.state.data[key].showBoutique) ? null :
                            <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                                <Card fluid raised color="orange" onClick={() => this.props.history.push(`/eleve/boutique/${key}`)}>
                                    <Image fluid src={this.state.data[key].imageUrl} />
                                    <Card.Content>
                                        <Card.Header>{this.state.data[key].nom}</Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Card.Header textAlign="center">
                                            {this.state.data[key].versements > 1 ? Math.round(this.state.data[key].prix/this.state.data[key].versements*100)/100 : this.state.data[key].prix} €
                                            {this.state.data[key].versements > 1 && <sup>x{this.state.data[key].versements}</sup>}
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                                <br />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                </Grid>
                <Header block as="h2" content="Prestations" />
                <Grid>
                    <Grid.Row>
                    {
                        _.filter(Object.keys(this.state.data), key => this.filterSearch(key) && this.filterPrestations(key)).map(key => (
                            !(this.state.data[key] && this.state.data[key].showBoutique) ? null :
                            <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                                <Card fluid raised color="orange" onClick={() => this.props.history.push(`/eleve/boutique/${key}`)}>
                                    <Image fluid src={this.state.data[key].imageUrl} />
                                    <Card.Content>
                                        <Card.Header>{this.state.data[key].nom}</Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Card.Header textAlign="center">
                                            {this.state.data[key].versements > 1 ? Math.round(this.state.data[key].prix/this.state.data[key].versements*100)/100 : this.state.data[key].prix} €
                                            {this.state.data[key].versements > 1 && <sup>x{this.state.data[key].versements}</sup>}
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                                <br />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

Produits.propTypes = {
    history: PropTypes.object,
};

export default Produits;