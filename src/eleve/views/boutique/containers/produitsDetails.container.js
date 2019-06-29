// React
import React, { Component } from 'react';
import { Header, Segment, Grid, Card, Image, List, Responsive, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getBoutiques, getElevePanier } from '../../../../actions/get.action';
import { editElevePanier } from '../../../../actions/edit.action';

class ProduitDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            boutique: {},
            loading: true,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(boutique => {
            const data = boutique[this.props.match.params.id] ? boutique[this.props.match.params.id] : {};
            this.setState({ data, boutique, loading: false });
        });
    }

    handleClick() {
        const { uid } = getLoggedUser();
        this.setState({ loading: true });
        getElevePanier(uid).then(panier => {
            if (Object.keys(panier).find(e => e === this.props.match.params.id)) panier[this.props.match.params.id] += 1
            else panier[this.props.match.params.id] = 1;
            editElevePanier(uid, panier).then(() => {
                this.setState({ loading: false });
                this.props.history.push("/eleve/panier");
            });
        });
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Responsive
                                    as={() => <Button fluid icon="arrow left" content="Retour" onClick={() => this.props.history.push('/eleve/boutique')} />}
                                    minWidth={1024}
                                />
                                <Responsive
                                    as={() => <Button fluid icon="arrow left" onClick={() => this.props.history.push('/eleve/boutique')} />}
                                    maxWidth={1023}
                                />
                            </Grid.Column>
                            <Grid.Column width={8} />
                            <Grid.Column width={4}>
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
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={6} tablet={16}>
                            <Card fluid>
                                <Image fluid src={this.state.data.imageUrl} />
                                <Card.Content as={Segment} color="orange" inverted>
                                    <Header as="h1" color="white" textAlign="center">
                                        {this.state.data.versements > 1 ? Math.round(this.state.data.prix/this.state.data.versements*100)/100 : this.state.data.prix} €
                                        {this.state.data.versements > 1 && <sup>x{this.state.data.versements}</sup>}
                                        {this.state.data.versements > 1 && <Header.Subheader content={`Soit ${this.state.data.prix} €`} />}
                                    </Header>
                                </Card.Content>
                                <Card.Content>
                                    <Button
                                        fluid inverted
                                        icon="add"
                                        color="orange"
                                        content="Ajouter dans mon panier"
                                        onClick={this.handleClick}
                                    />
                                </Card.Content>
                            </Card>
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={10} tablet={16}>
                            <Segment>
                                <Header as="h2" color="orange">{this.state.data.type} - {this.state.data.nom}</Header>
                                <List bulleted>
                                {
                                    this.state.data.prestations ?
                                    Object.keys(this.state.data.prestations).map(prestationId => (
                                        <List.Item icon="right triangle" key={prestationId}>{this.state.boutique[prestationId].nom} ({this.state.data.prestations[prestationId] !== -1 ? this.state.data.prestations[prestationId] : "Illimité"})</List.Item>
                                    )) : <List.Item>{this.state.data.nom} (1)</List.Item>
                                }
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

ProduitDetails.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default ProduitDetails;