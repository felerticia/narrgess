// React requirement
import React, { Component } from 'react';
import { Menu, Image, Divider, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from './sidebar.style';

// actions
import { getLoggedUser, signOut } from '../../../actions/auth.action';
import { getMoniteur } from '../../../actions/get.action';

class SidebarLaptop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moniteur: {},
        };

        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getMoniteur(uid).then(moniteur => this.setState({ moniteur }));
    }

    handleClick(_, { name }) {
        this.props.history.push(`/moniteur/${name}`);
    }

    render() {
        return (
            <Menu
                fluid attached vertical
                secondary inverted
                style={Style.Menu}
            >
                <Menu.Item
                    style={Style.BigLogo}
                    onClick={() => this.props.history.push('/moniteur')}
                >
                    <Image
                        bordered={false}
                        src="/img/logo-inverted.png"
                    />
                </Menu.Item>
                <Divider />
                <Menu.Item>
                    <Header
                        as="h4" inverted textAlign="center"
                        content={`Bonjour ${this.state.loading ? "" : `${this.state.moniteur.nom} ${this.state.moniteur.prenom}`} !`}
                    />
                </Menu.Item>
                <Divider />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "planning"}
                    name="planning"
                    icon="calendar"
                    content="Planning"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "eleves"}
                    name="eleves"
                    icon="user"
                    content="Eleves"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "compte"}
                    name="compte"
                    icon="cog"
                    content="Compte"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item>
                    <Button
                        fluid negative
                        icon='power'
                        content='Déconnexion'
                        onClick={signOut}
                    />
                </Menu.Item>
            </Menu>
        );
    }
}

SidebarLaptop.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(SidebarLaptop);