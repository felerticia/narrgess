// React requirement
import React, { Component } from 'react';
import { Button, Form, Header, Segment, Message, Icon, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types';

// actions
import { createUser } from '../../actions/add.action';
import { editUser, editEleve } from '../../actions/edit.action';
import { signInWithEmailAndPassword, signInWithPopup, facebookProvider, googleProvider, twitterProvider } from '../../actions/auth.action';

const search2params = search => {
    const params = {};
    const withoutQM = search.substring(1);
    const splitAnd = withoutQM.split("&");
    splitAnd.forEach(paramToSplit => {
        const paramSplitted = paramToSplit.split("=");
        const paramKey = paramSplitted[0];
        const paramValue = paramSplitted[1];
        params[paramKey] = paramValue;
    });
    return params;
};

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            civilite: "",
            nom: "",
            prenom: "",
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFacebookSubmit = this.handleFacebookSubmit.bind(this);
        this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this);
        this.handleTwitterSubmit = this.handleTwitterSubmit.bind(this);
        this.addUserWithProvider = this.addUserWithProvider.bind(this);
    }
  
    handleChange(key, val) {
        let newState = Object.assign({}, this.state);
        newState[key] = val;
        this.setState(newState);
    }
  
    handleSubmit() {
        const params = search2params(this.props.location.search);
        const panier = {};
        if (params.forfait) panier[params.forfait] = 1;
        this.setState({ loading: true });
        if (!this.state.civilite || this.state.civilite.length === 0) this.setState({ loading: false, error: { message: "Il faut donner une civilité" } });
        else if (!this.state.nom || this.state.nom.length === 0) this.setState({ loading: false, error: { message: "Il faut donner un nom" } });
        else if (!this.state.prenom || this.state.prenom.length === 0) this.setState({ loading: false, error: { message: "Il faut donner un prénom" } });
        else if (!this.state.email || this.state.email.length === 0) this.setState({ loading: false, error: { message: "Il faut donner un email" } });
        else if (!this.state.password || this.state.password.length === 0 || this.state.password.length < 8) this.setState({ loading: false, error: { message: "Le mot de passe doit avoir une longueur minimum de 8 caractères" } });
        else if (this.state.password !== this.state.confirmPassword) this.setState({ loading: false, error: { message: "Les deux mots de passes ne sont pas identiques" } });
        else {
            createUser(this.state.email, this.state.password).then(user => {
                editUser(user.uid, { type: "eleve", level: -1, email: this.state.email }).then(() => {
                    editEleve(user.uid, {
                        dossier: { eleve: {
                            civilite: this.state.civilite,
                            nom: this.state.prenom,
                            prenom: this.state.prenom,
                        }},
                        panier,
                    }).then(() => {
                        signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                            this.setState({ loading: false });
                            setTimeout(() => {
                                this.props.history.push('/eleve/panier');
                                window.location.reload();
                            }, 100);
                        }).catch(error => this.setState({ loading: false, error }));
                    }).catch(error => this.setState({ loading: false, error }));
                }).catch(error => this.setState({ loading: false, error }));
            }).catch(error => this.setState({ loading: false, error }));
        }
    }

    handleFacebookSubmit() {
        this.setState({ loading: true });
        const provider = facebookProvider();
        provider.addScope('email');
        provider.addScope('user_gender');
        provider.addScope('user_birthday');
        this.addUserWithProvider(provider);
    }

    handleGoogleSubmit() {
        this.setState({ loading: true });
        const provider = googleProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
        this.addUserWithProvider(provider);
    }

    handleTwitterSubmit() {
        this.setState({ loading: true });
        const provider = twitterProvider();
        this.addUserWithProvider(provider);
    }

    addUserWithProvider(provider) {
        const params = search2params(this.props.location.search);
        const panier = {};
        if (params.forfait) panier[params.forfait] = 1;
        signInWithPopup(provider).then(res => {
            const { uid } = res.user;
            const { profile, providerId } = res.additionalUserInfo;
            let email = ''; let nom = ''; let prenom = ''; let dateNaissance = ''; let civilite = '';
            if (providerId === 'google.com') {
                email = profile.email;
                nom = profile.family_name;
                prenom = profile.given_name;
            } else if (providerId === 'facebook.com') {
                email = profile.email;
                nom = profile.last_name;
                prenom =  profile.first_name;
                dateNaissance = profile.birthday ? new Date(profile.birthday).toString() : '';
                civilite = profile.gender ? profile.gender === 'male' ? 'Monsieur' : 'Madame' : '' ;
            } else if (providerId === 'twitter.com') {
                // TODO
            }
            editUser(uid, { email, type: 'eleve', level: -1 }).then(() => {
                editEleve(uid, {
                    dossier: { eleve: {
                        nom, prenom, civilite,
                        dateNaissance: new Date(dateNaissance).toString(),
                    }},
                    panier,
                }).then(() => {
                    setTimeout(() => {
                        this.props.history.push('/eleve/panier');
                        window.location.reload();
                    }, 100);
                    this.setState({ error: false, loading: false });
                }).catch(error => this.setState({ error, loading: false }));
            }).catch(error => this.setState({ error, loading: false }));
        }).catch(error => this.setState({ error, loading: false }));
    }
  
    render() {
        
        return (
            <div>
                {
                    this.state.error &&
                    <Message
                        color='red'
                        content={this.state.error.message}
                    />
                }
                <Form size='large' loading={this.state.loading}>
                    <Segment raised>
                        <Button
                            compact
                            circular
                            floated='left'
                            icon='arrow left'
                            onClick={e => {e.preventDefault(); this.props.history.goBack();}}
                        />
                        <Header as='h2' color='orange' textAlign='center'>
                            <Icon name='add user' color='orange' />
                            {' '}S&#39;inscire
                        </Header>
                        <Form.Dropdown
                            fluid selection
                            placeholder='Civilité...'
                            options={[
                                { key: 0, text: 'Monsieur', value: 'Monsieur' },
                                { key: 1, text: 'Madame', value: 'Madame' },
                                { key: 2, text: 'Mademoiselle', value: 'Mademoiselle' },
                            ]}
                            value={this.state.civilite}
                            onChange={(_, { value }) => this.handleChange('civilite', value)}
                        />
                        <Form.Input
                            fluid
                            placeholder='Nom...'
                            value={this.state.nom}
                            onChange={(_, { value }) => this.handleChange('nom', value)}
                        />
                        <Form.Input
                            fluid
                            placeholder='Prenom...'
                            value={this.state.prenom}
                            onChange={(_, { value }) => this.handleChange('prenom', value)}
                        />
                        <Form.Input
                            fluid
                            type='email'
                            placeholder='E-mail...'
                            value={this.state.email}
                            onChange={e => this.handleChange('email', e.target.value)}
                        />
                        <Form.Input
                            fluid
                            placeholder='Mot de passe...'
                            type='password'
                            value={this.state.password}
                            onChange={e => this.handleChange('password', e.target.value)}
                        />
                        <Form.Input
                            fluid
                            placeholder='Confirmez mot de passe...'
                            type='password'
                            value={this.state.confirmPassword}
                            onChange={e => this.handleChange('confirmPassword', e.target.value)}
                        />
                        <Button
                            fluid
                            color='orange'
                            size='large'
                            content='Envoyer !'
                            onClick={this.handleSubmit}
                        />
                        <Divider horizontal>OU S'INSCRIRE AVEC ...</Divider>
                        <Button.Group fluid size='large' widths={5}>
                            <Button
                                color='facebook'
                                content='Facebook'
                                icon='facebook'
                                onClick={this.handleFacebookSubmit}
                            />
                            <Button
                                color='google plus'
                                content='Google'
                                icon='google'
                                onClick={this.handleGoogleSubmit}
                            />
                            <Button
                                color='twitter'
                                content='Twitter'
                                icon='twitter'
                                onClick={this.handleTwitterSubmit}
                            />
                        </Button.Group>   
                    </Segment>
                </Form>
            </div>
        );
    }
}
  
SignIn.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};
  
export default SignIn;