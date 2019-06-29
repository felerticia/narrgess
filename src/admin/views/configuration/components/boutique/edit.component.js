// React
import React, { Component } from 'react';
import { Segment, Header, Button, Form, Message, Table, Divider } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

// actions
import { getBoutiques, getBoutique, getContrats, getTypesRDV } from '../../../../../actions/get.action';
import { editBoutique, editBoutiqueArchive } from '../../../../../actions/edit.action';
import { deleteBoutique } from '../../../../../actions/delete.action';
import { addStorage, getDownloadURL } from '../../../../../actions/storage.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "Prestation",
            nom: "",
            prix: 0,
            versements: 1,
            tva: 20,
            contrat: "",
            heureAjout: {},
            forfaitPrestations: {},
            image: null,
            imageName: "",
            imageUrl: "",
            showBoutique: false,
            loading: true,
            prestations: {},
            contrats: {},
            typesRDV: {},
            errMessage: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
    }

    UNSAFE_componentWillMount() {
        getBoutiques().then(boutique => {
            const prestationsKeys = Object.keys(boutique).filter(key => boutique[key].type === "Prestation");
            const prestations = {};
            const thisBoutique = boutique[this.props.match.params.id];
            prestationsKeys.forEach(key => prestations[key] = boutique[key]);
            getContrats().then(contrats => {
                getTypesRDV().then(typesRDV => {
                    this.setState({
                        type: thisBoutique.type,
                        nom: thisBoutique.nom,
                        prix: thisBoutique.prix,
                        versements: thisBoutique.versements,
                        tva: thisBoutique.tva,
                        contrat: thisBoutique.contrat ? thisBoutique.contrat : "",
                        heureAjout: thisBoutique.heureAjout ? thisBoutique.heureAjout : {},
                        forfaitPrestations: thisBoutique.prestations ? thisBoutique.prestations : {},
                        imageName: thisBoutique.imageName ? thisBoutique.imageName : "",
                        showBoutique: thisBoutique.showBoutique ? thisBoutique.showBoutique : false,
                        imageUrl: thisBoutique.imageUrl ? thisBoutique.imageUrl : "",
                        typesRDV,
                        contrats,
                        prestations,
                        loading: false,
                    });
                });
            });
        });
    }

    handleSubmit() {
        if (!this.state.nom || this.state.nom.length === 0) this.setState({ errMessage: "Il faut remplir le champs 'Nom'" });
        else {
            this.setState({ loading: true });
            const produit = {
                nom: this.state.nom,
                prix: this.state.prix,
                tva: this.state.tva,
                type: this.state.type,
                versements: this.state.versements,
                contrat: this.state.contrat ? this.state.contrat : "",
                imageName: this.state.imageName,
                showBoutique: this.state.showBoutique,
                imageUrl: this.state.imageUrl,
            };
            if (this.state.type === "Prestation") produit.heureAjout = this.state.heureAjout;
            else {
                let nbHours = {};
                Object.keys(this.state.forfaitPrestations).forEach(key => {
                    const heureAjout = this.state.prestations[key].heureAjout ? this.state.prestations[key].heureAjout : {};
                    Object.keys(heureAjout).forEach(typeRDV => {
                        if (nbHours[typeRDV]) nbHours[typeRDV] += this.state.forfaitPrestations[key]*heureAjout[typeRDV];
                        else nbHours[typeRDV] = this.state.forfaitPrestations[key]*heureAjout[typeRDV];
                    });
                });
                produit.prestations = this.state.forfaitPrestations;
                produit.heureAjout = nbHours;
            }
            const { id } = this.props.match.params
            editBoutique(id, produit).then(() => {
                if (this.state.image) {
                    addStorage(`/boutique/${id}/${this.state.imageName}`, this.state.image).then(() => {
                        getDownloadURL(`/boutique/${id}/${this.state.imageName}`).then(downloadURL => {
                            editBoutique(id, { imageUrl: downloadURL }).then(() => {
                                this.setState({ loading: false });
                                this.props.history.push('/admin/configuration/boutique');
                            });
                        });
                    });
                } else {
                    this.setState({ loading: false });
                    this.props.history.push('/admin/configuration/boutique');
                }
            });
        }
    }

    toggleConfirm() {
        confirmAlert({
            title: "Archiver",
            message: "Voulez-vous vraiment archiver cette donnée ?",
            buttons: [
                { label: "Oui", onClick: this.handleArchive },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleArchive() {
        this.setState({ loading: true });
        getBoutique(this.props.match.params.id).then(boutique => {
            editBoutiqueArchive(this.props.match.params.id, boutique).then(() => {
                deleteBoutique(this.props.match.params.id).then(() => {
                    this.setState({ loading: false });
                    this.props.history.push('/admin/configuration/boutique');
                });
            });
        });
    }

    render() {
        return (
            <div>
                <Segment raised loading={this.state.loading}>
                    <Header textAlign="center" content="Ajouter un élément à la boutique" />
                    <Message
                        negative
                        icon="warning"
                        header="Erreur"
                        content={this.state.errMessage}
                        hidden={this.state.errMessage.length === 0}
                    />
                    <Form>
                        <Form.Field>
                            <label>Type</label>
                            <Form.Radio
                                label="Prestation"
                                name="Prestation"
                                value="Prestation"
                                checked={this.state.type === "Prestation"}
                                onChange={(_, { value }) => this.setState({ type: value, forfaitPrestations: {} })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Radio
                                label="Forfait"
                                name="Forfait"
                                value="Forfait"
                                checked={this.state.type === "Forfait"}
                                onChange={(_, { value }) => this.setState({ type: value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Nom</label>
                            <Form.Input
                                fluid
                                value={this.state.nom}
                                onChange={(_, { value }) => this.setState({ nom: value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Prix TTC</label>
                            <Form.Input
                                fluid
                                min={0}
                                type="number"
                                value={this.state.prix}
                                onChange={(_, { value }) => this.setState({ prix: parseFloat(value) })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Nombre de versements</label>
                            <Form.Input
                                fluid
                                min={1} max={3}
                                type="number"
                                value={this.state.versements}
                                onChange={(_, { value }) => this.setState({ versements: parseFloat(value) })}
                            />
                        </Form.Field>
                        {
                            this.state.type === "Prestation" &&
                            <Form.Field>
                                <label>TVA (%)</label>
                                <Form.Input
                                    fluid
                                    type="number"
                                    value={this.state.tva}
                                    onChange={(_, { value }) => this.setState({ tva: parseFloat(value) })}
                                />
                            </Form.Field>
                        }
                        <Form.Field>
                            <label>Contrat</label>
                            <Form.Dropdown
                                fluid search selection
                                placeholder="Contrat ..."
                                value={this.state.contrat}
                                onChange={(_, { value }) => this.setState({ contrat: value })}
                                options={Object.keys(this.state.contrats).map(key => ({
                                    key,
                                    value: key,
                                    text: this.state.contrats[key].nom,
                                }))}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Image {this.state.imageName.length > 0 && <span>({this.state.imageName})</span>}</label>
                            <Form.Input
                                fluid
                                type="file"
                                accept="image/*"
                                onChange={e => this.setState({ image: e.target.files[0], imageName: e.target.files[0].name })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Checkbox
                                toggle
                                label="Afficher dans l'E-Boutique"
                                checked={this.state.showBoutique}
                                onChange={(_, { checked }) => this.setState({ showBoutique: checked })}
                            />
                        </Form.Field>
                        <Divider />
                        <Form.Field>
                        {
                            this.state.type === "Forfait" ?
                            <div>
                                <Table basic="very">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Prestation</Table.HeaderCell>
                                            <Table.HeaderCell>Quantité</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                    {
                                        this.state.prestations &&
                                        Object.keys(this.state.prestations).map(key => (
                                            <Table.Row key={key}>
                                                <Table.Cell>{this.state.prestations[key].nom}</Table.Cell>
                                                <Table.Cell>
                                                    <Form.Input
                                                        fluid min={0}
                                                        type="number"
                                                        value={this.state.forfaitPrestations[key] ? this.state.forfaitPrestations[key] : 0}
                                                        onChange={(_, { value }) => {
                                                            const { forfaitPrestations } = this.state;
                                                            forfaitPrestations[key] = parseInt(value, 10);
                                                            this.setState({ forfaitPrestations });
                                                        }}
                                                    />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                    </Table.Body>
                                </Table>
                            </div> :
                            Object.keys(this.state.typesRDV).map(typeRDV => (
                                <div key={typeRDV}>
                                    <label>Nombre de "{this.state.typesRDV[typeRDV].nom}" ajouté(e)s</label>
                                    <Form.Input
                                        fluid
                                        min={0}
                                        type="number"
                                        value={this.state.heureAjout[typeRDV]}
                                        onChange={(_, { value }) => {
                                            const heureAjout = {}; heureAjout[typeRDV] = parseInt(value, 10);
                                            this.setState({ heureAjout: Object.assign(this.state.heureAjout, heureAjout) })
                                        }}
                                    />
                                </div>
                            ))
                        }
                        </Form.Field>
                    </Form>
                    <br />
                    <Button
                        fluid positive
                        icon="edit"
                        content="Modifier"
                        onClick={this.handleSubmit}
                    />
                </Segment>
                <Button
                    fluid
                    color="orange"
                    icon="trash"
                    content="Archiver"
                    onClick={this.toggleConfirm}
                />
            </div>
        );
    }
}

Edit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Edit;