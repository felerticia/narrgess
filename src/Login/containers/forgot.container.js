// React requirement
import React, { Component } from 'react';
import { Button, Form, Header, Segment, Message, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';

// actions
import { sendPasswordResetEmail } from '../../actions/auth.action'

class Forgot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            loading: false,
            error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({ loading: true });
        sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({
                error: false,
                loading: false,
                message: { color: 'green', text: "Un mail de récupération de ton mot de passe a été envoyé !" },
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false,
                message: { color: 'red', text: error.message },
            });
        });
    }

    render() {
        return (
            <div>
                {
                    (this.state.error || this.state.message) &&
                    <Message
                        color={this.state.message.color}
                        content={this.state.message.text}
                    />
                }
                <Form loading={this.state.loading}>
                    <Segment raised>
                        <Button
                            compact
                            circular
                            floated='left'
                            icon='arrow left'
                            onClick={e => {e.preventDefault(); this.props.history.push('/login');}}
                        />
                        <Header as='h2' color='orange' textAlign='center'>
                            <Icon name='key' color='orange' size='massive' />
                            {' '}Mot de passe oublié
                        </Header>
                        <Form.Input
                            fluid
                            icon='mail outline'
                            iconPosition='left'
                            placeholder='E-mail...'
                            value={this.state.email}
                            onChange={(_, { value }) => this.setState({ email: value })}
                        />
                        <Button
                            fluid
                            color='orange'
                            size='large'
                            content='Envoyer !'
                            onClick={this.handleSubmit}
                        />
                    </Segment>
                </Form>
            </div>
        );
    }
}

Forgot.propTypes = {
    history: PropTypes.object,
};

export default Forgot;