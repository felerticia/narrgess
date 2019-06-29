// React requirement
import React, { Component } from 'react';
import { Menu, Image, Divider, Header, Button, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from './sidebar.style';

// actions
import { getLoggedUser, signOut } from '../../../actions/auth.action';
import { getEleveDossier, getElevePanier } from '../../../actions/get.action';

class SidebarLaptop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eleve: {},
            panier: 0,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        const loggedUser = getLoggedUser();
        const uid = loggedUser ? loggedUser.uid : null;
        getEleveDossier(uid).then(dossier => this.setState({ eleve: dossier.eleve }));
        setInterval(this.fetchData, 5000);
    }

    fetchData() {
        const loggedUser = getLoggedUser();
        const uid = loggedUser ? loggedUser.uid : null;
        if (uid) getElevePanier(uid).then(panier => this.setState({ panier: Object.values(panier).length }));
    }

    handleClick(_, { name }) {
        this.props.history.push(`/eleve/${name}`);
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
                    onClick={() => this.props.history.push('/eleve')}
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
                        content={`Bonjour ${this.state.loading ? "" : `${this.state.eleve.nom} ${this.state.eleve.prenom}`} !`}
                    />
                </Menu.Item>
                <Divider />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "home"}
                    name="home"
                    icon="th"
                    content="Tableau de bord"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "dossier"}
                    name="dossier"
                    icon="folder outline"
                    content="Mon dossier"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "boutique"}
                    name="boutique"
                    icon="shop"
                    content="E-Boutique"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "panier"}
                    name="panier"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon name="shopping basket" />{" "}
                    Mon panier
                    {this.state.panier > 0 && <Label circular floating color="red" content={this.state.panier} />}
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "code"}
                    name="code"
                    icon="drivers license"
                    content="Code"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "conduite"}
                    name="conduite"
                    icon="car"
                    content="Conduite"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "examen"}
                    name="examen"
                    icon="student"
                    content="Examen"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "compte"}
                    name="compte"
                    icon="credit card outline"
                    content="Mon compte"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "financer"}
                    name="financer"
                    icon="money bill alternate outline"
                    content="Financer mon permis"
                    style={Style.Item}
                    onClick={this.handleClick}
                />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "informations"}
                    name="informations"
                    icon="globe"
                    content="Informations"
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