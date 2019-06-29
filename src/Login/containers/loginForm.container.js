// React requirement
import React, { Component } from 'react';
import { Button, Form, Header, Icon, Divider, Segment, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types';

// actions
import { editUser, editEleve } from '../../actions/edit.action';
import { signInWithEmailAndPassword, signInWithPopup, facebookProvider, googleProvider, twitterProvider } from '../../actions/auth.action';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
            error: false,
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFacebookSubmit = this.handleFacebookSubmit.bind(this);
        this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this);
        this.handleTwitterSubmit = this.handleTwitterSubmit.bind(this);
        this.addUserWithProvider = this.addUserWithProvider.bind(this);
    }
  
    handleKeyPress(target) {
        if (target.charCode === 13) {      
            this.handleSubmit();
        }
    }
  
    handleSubmit() {
        this.setState({ loading: true });
        signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.history.push('/'))
        .catch(error => this.setState({ error, loading: false }));
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
                }).then(() => {
                    this.props.history.push('/');
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
                <Form size='large' loading={this.state.loading} onKeyPress={this.handleKeyPress}>
                    <Segment raised>
                        <Header as='h1' color='orange' textAlign='center'>
                            <Icon name='sign in' color='orange' />
                            {' '}Connecte toi !
                        </Header>
                        <Form.Input
                            fluid
                            icon='mail outline'
                            iconPosition='left'
                            placeholder='E-mail...'
                            value={this.state.email}
                            onChange={(_, { value }) => this.setState({ email: value })}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Mot de passe'
                            type='password'
                            value={this.state.password}
                            onChange={(_, { value }) => this.setState({ password: value })}
                        />
                        <Button
                            fluid
                            color='orange'
                            size='large'
                            content='Se connecter !'
                            onClick={this.handleSubmit}
                        />
                        <Divider horizontal>OU SE CONNECTER AVEC ...</Divider>
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
                <Divider horizontal>OU</Divider>
                <Button.Group fluid size='large' widths={8}>
                    <Button
                        color='orange'
                        content='Mot de passe oublié'
                        onClick={() => this.props.history.push('/forgot')}
                    />
                    <Button
                        color='green'
                        content='S&#39;inscrire'
                        onClick={() => this.props.history.push('/signin')}
                    />
                </Button.Group>
            </div>
        );
    }
  }
  
  LoginForm.propTypes = {
      history: PropTypes.object,
  };
  
  export default LoginForm;