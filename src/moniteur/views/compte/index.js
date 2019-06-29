// React
import React, { Component } from 'react';
import { Container, Segment, Header, Form, Input, Grid, Image, Message, Button } from 'semantic-ui-react';

// actions
import { getLoggedUser } from '../../../actions/auth.action';
import { getMoniteur } from '../../../actions/get.action';
import { editMoniteur } from '../../../actions/edit.action';
import { deleteMoniteurImageName, deleteMoniteurImageURL } from '../../../actions/delete.action';
import { getDownloadURL, addStorage, deleteStorage } from '../../../actions/storage.action';

class Compte extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            tel: "",
            ville: "",
            errorMessage: "",
            image: null,
            imageName: "",
            avatarUrl: "",
            loading: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getMoniteur(uid).then(data => {
            this.setState({
                nom: data.nom,
                prenom: data.prenom,
                tel: data.tel,
                ville: data.ville,
                imageName: data.imageName,
            });
            if (data.imageName) getDownloadURL(`/moniteurs/${uid}/${data.imageName}`).then(imageUrl => this.setState({ imageUrl, loading: false }));
            else getDownloadURL("/moniteurs/avatar.jpg").then(avatarUrl => this.setState({ avatarUrl, loading: false }));
        });
    }

    handleSubmit() {
        const { uid } = getLoggedUser();
        this.setState({ loading: true });
        editMoniteur(uid, {
            nom: this.state.nom,
            prenom: this.state.prenom,
            tel: this.state.tel,
            ville: this.state.ville,
        }).then(() => {
            if (this.state.image) {
                addStorage(`/moniteurs/${uid}/${this.state.imageName}`, this.state.image).then(() => {
                    getDownloadURL(`/moniteurs/${uid}/${this.state.imageName}`).then(downloadURL => {
                        editMoniteur(uid, { imageUrl: downloadURL, imageName: this.state.imageName }).then(() => {
                            getDownloadURL(`/moniteurs/${uid}/${this.state.imageName}`).then(imageUrl => this.setState({ imageUrl, loading: false, errorMessage: "" }));
                        }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
                    });
                }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
            } else this.setState({ loading: false });
        });
    }

    deleteImage() {
        const { uid } = getLoggedUser();
        this.setState({ loading: true });
        if (this.state.imageName) {
            deleteStorage(`/moniteurs/${uid}/${this.state.imageName}`).then(() => {
                deleteMoniteurImageName(uid).then(() => {
                    deleteMoniteurImageURL(uid).then(() => {
                        this.setState({ imageUrl: "", loading: false, errorMessage: "" });
                    }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
                }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
            }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div>
                <Segment inverted fluid padded attached color="orange">
                    <Header
                        as="h2"
                        icon="cog"
                        content="Compte"
                        subheader="Changez les paramètres de votre compte"
                    />
                </Segment>
                <br />
                <Container>
                    <Segment color="orange">
                        <Header textAlign="center" content="Mon compte" />
                        <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                            <Message
                                negative
                                header="Erreur"
                                hidden={this.state.errorMessage.length === 0}
                                content={this.state.errorMessage}
                            />
                            <Grid columns={2} divided>
                                <Grid.Row>
                                    <Grid.Column verticalAlign="middle" computer={2} tablet={4} mobile={16}>
                                        <Image
                                            circular
                                            size="small"
                                            src={this.state.imageUrl ? this.state.imageUrl : this.state.avatarUrl}
                                        />
                                        <br />
                                    </Grid.Column>
                                    <Grid.Column verticalAlign="middle" computer={14} tablet={12} mobile={16}>
                                        <Form.Field>
                                            <Input
                                                fluid
                                                type="file"
                                                accept="image/*"
                                                label="Image :"
                                                onChange={e => this.setState({ image: e.target.files[0], imageName: e.target.files[0].name })}
                                            />
                                            <br />
                                            <Button
                                                negative
                                                icon="trash"
                                                content="Supprimer"
                                                onClick={this.deleteImage}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <br />
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Nom :"
                                    placeholder='Nom...'
                                    value={this.state.nom}
                                    onChange={(_, { value }) => this.setState({ nom: value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Prenom :"
                                    placeholder='Prenom...'
                                    value={this.state.prenom}
                                    onChange={(_, { value }) => this.setState({ prenom: value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Téléphone :"
                                    placeholder='Téléphone...'
                                    value={this.state.tel}
                                    onChange={(_, { value }) => this.setState({ tel: value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Ville :"
                                    placeholder='Ville...'
                                    value={this.state.ville}
                                    onChange={(_, { value }) => this.setState({ ville: value })}
                                />
                            </Form.Field>
                            <Button
                                fluid
                                positive
                                icon="edit"
                                content="Modifier"
                                onClick={this.handleSubmit}
                            />
                        </Form>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default Compte;