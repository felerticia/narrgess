// React requirement
import React, { Component } from 'react';
import { Button, Form, Header, Segment, Message, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { confirmPasswordReset } from '../../actions/auth.action';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            loading: false,
            error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({ loading: true });
        confirmPasswordReset(this.props.actionCode, this.state.password).then(() => {
            this.setState({
                error: false,
                loading: false,
                message: { color: 'green', text: "Mot de passe réinitialisé" },
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
                            {' '}Nouveau mot de passe
                        </Header>
                        <Form.Input
                            fluid
                            type="password"
                            icon='lock'
                            iconPosition='left'
                            placeholder='Nouveau mot de passe...'
                            value={this.state.password}
                            onChange={(_, { value }) => this.setState({ password: value })}
                        />
                        <Button
                            fluid
                            color='orange'
                            size='large'
                            content='Réinitialiser !'
                            onClick={this.handleSubmit}
                        />
                    </Segment>
                </Form>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    actionCode: PropTypes.string,
    history: PropTypes.object,
};

export default withRouter(ResetPassword);