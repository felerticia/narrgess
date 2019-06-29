// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Checkbox, Segment } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert'; 
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';

// Loca
import ListLieuxRDV from './listLieuxRDV.component';
import ListIndisponibilites from './indisponibilites/list.component';
import ListParcAutomobile from './listParcAutomobile.component';

// actions
import { getUserEmail, getUser, getMoniteur, getLieuxRDV } from '../../../../../actions/get.action';
import { editUser, editUserEmail, editMoniteur, editUserArchive, editMoniteurArchive } from '../../../../../actions/edit.action';
import { deleteUser, deleteMoniteur, deleteLieuxRDVMoniteur } from '../../../../../actions/delete.action';
import { addStorage, getDownloadURL } from '../../../../../actions/storage.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            tel: "",
            ville: "",
            email: "",
            image: null,
            imageName: "",
            imageUrl: "",
            dateEmbauche: moment(),
            coach: false,
            eleveDisplay: false,
            lieuxRDV: {},
            loading: true,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        getMoniteur(id).then(moniteur => {
            getUserEmail(id).then(email => {
                this.setState({
                    nom: moniteur.nom,
                    prenom: moniteur.prenom,
                    tel: moniteur.tel,
                    ville: moniteur.ville,
                    email,
                    dateEmbauche: moniteur.dateEmbauche ? moment(new Date(moniteur.dateEmbauche)) : moment(),
                    lieuxRDV: moniteur.lieuxRDV ? moniteur.lieuxRDV : {},
                    imageName: moniteur.imageName ? moniteur.imageName : "",
                    imageUrl: moniteur.imageUrl ? moniteur.imageUrl : "",
                    coach: moniteur.coach === 'true' || moniteur.coach,
                    eleveDisplay: moniteur.eleveDisplay === 'true' || moniteur.eleveDisplay,
                    indisponibilites: moniteur.indisponibilites,
                    loading: false,
                });
            });
        });
    }

    handleError() {
        let errorMessage = "";
        Object.keys(this.state).forEach(key => {
            if (key !== 'loading' && key !== 'errorMessage' && key !== 'lieuxRDV' && this.state[key] === undefined) {
                errorMessage = `Il faut remplir le champs : ${key}`;
            }
        });
        this.setState({ errorMessage });
        return errorMessage.length !== 0;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const error = this.handleError();
        if (!error) {
            const { id } = this.props.match.params;
            editUserEmail(id, this.state.email).then(() => {
                editUser(id, { level: this.state.level }).then(() => {
                    editMoniteur(id, {
                        nom: this.state.nom,
                        prenom: this.state.prenom,
                        tel: this.state.tel,
                        ville: this.state.ville,
                        dateEmbauche: this.state.dateEmbauche.toLocaleString(),
                        coach: this.state.coach,
                        eleveDisplay: this.state.eleveDisplay,
                        lieuxRDV: this.state.lieuxRDV,
                        indisponibilites: this.state.indisponibilites,
                        imageName: this.state.imageName,
                    }).then(() => {
                        if (this.state.image) {
                            addStorage(`/moniteurs/${this.props.match.params.id}/${this.state.imageName}`, this.state.image).then(() => {
                                getDownloadURL(`/moniteurs/${this.props.match.params.id}/${this.state.imageName}`).then(downloadURL => {
                                    editMoniteur(this.props.match.params.id, { imageUrl: downloadURL }).then(() => {
                                        this.setState({ loading: false });
                                        this.props.history.push('/admin/configuration/moniteurs');
                                    });
                                });
                            })
                        } else {
                            this.setState({ loading: false });
                            this.props.history.push('/admin/configuration/moniteurs');
                        }
                    }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    toggleConfirm() {
        confirmAlert({
            title: "Archiver",
            message: `Voulez-vous vraiment archiver cette donnée ?`,
            buttons: [
                { label: "Oui", onClick: this.handleArchive },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleArchive() {
        const { id } = this.props.match.params;
        this.setState({ loading: true, errorMessage: "" });
        getMoniteur(id).then(moniteur => {
            getUser(id).then(user => {
                this.props.history.push('/admin/configuration/moniteurs');
                editMoniteurArchive(id, moniteur).then(() => {
                    editUserArchive(id, user).then(() => {
                        deleteMoniteur(id).then(() => {
                            deleteUser(id).then(() => {
                                getLieuxRDV().then(lieuxRDV => {
                                    Object.keys(lieuxRDV).forEach(lieuxRDVId => {
                                        const lieux = lieuxRDV[lieuxRDVId];
                                        Object.keys(lieux.moniteurs).forEach(moniteurDataKey => {
                                            const { moniteur } = lieux.moniteurs[moniteurDataKey];
                                            if (moniteur === id) deleteLieuxRDVMoniteur(lieuxRDVId, moniteurDataKey);
                                        });
                                    });
                                    this.setState({ loading: false });
                                });
                            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                        }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                    }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
                }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
            });
        });
    }

    render() {
        return (
            <div>
                <Segment raised>
                    <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                        <Message
                            negative
                            hidden={this.state.errorMessage.length === 0}
                            header="Erreur"
                            content={this.state.errorMessage}
                        />
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
                        <Form.Field>
                            <Input
                                fluid
                                label="E-mail :"
                                type='email'
                                placeholder='E-mail...'
                                value={this.state.email}
                                onChange={(_, { value }) => this.setState({ email: value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                label="Date d&#39;embauche :"
                                selected={this.state.dateEmbauche}
                                onChange={date => this.setState({ dateEmbauche: date })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                toggle
                                label='Ce moniteur est un coach'
                                checked={this.state.coach}
                                onChange={(_, { checked }) => this.setState({ coach: checked })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                toggle
                                label="Ce moniteur est affiché sur l'interface élève"
                                checked={this.state.eleveDisplay}
                                onChange={(_, { checked }) => this.setState({ eleveDisplay: checked })}
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
                    </Form>
                    <br />
                    <Button
                        fluid positive
                        icon='edit'
                        content='Modifier'
                        onClick={this.handleSubmit}
                    />
                </Segment>
                <ListIndisponibilites />
                <ListLieuxRDV />
                <ListParcAutomobile />
                <Button
                    fluid
                    color='orange'
                    icon='archive'
                    content='Archiver'
                    onClick={() => this.toggleConfirm()}
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