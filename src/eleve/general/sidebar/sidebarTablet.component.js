// React requirement
import React, { Component } from 'react';
import { Menu, Image, Icon, Divider, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from './sidebar.style';

// actions
import { getLoggedUser, signOut } from '../../../actions/auth.action';
import { getElevePanier } from '../../../actions/get.action';

class SidebarTablet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            panier: 0,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        setInterval(this.fetchData, 5000);
    }

    fetchData() {
        const { uid } = getLoggedUser();
        if (uid) getElevePanier(uid).then(panier => this.setState({ panier: Object.values(panier).length }));
    }

    handleClick(_, { name }) {
        this.props.history.push(`/eleve/${name}`);
    }

    render() {
        return (
            <Menu
                fluid attached vertical
                secondary inverted icon
                style={Style.Menu}
            >
                <Menu.Item
                    style={Style.SmallLogo}
                    onClick={() => this.props.history.push('/eleve')}
                >
                    <Image
                        fluid centered
                        bordered={false}
                        src="/img/favicon.png"
                    />
                </Menu.Item>
                <Divider />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "home"}
                    name="home"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="th" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "dossier"}
                    name="dossier"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="folder outline" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "boutique"}
                    name="boutique"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="shop" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "panier"}
                    name="panier"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="shopping basket" />
                    {this.state.panier > 0 && <Label circular floating color="red" content={this.state.panier} />}
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "code"}
                    name="code"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="drivers license" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "conduite"}
                    name="conduite"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="car" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "examen"}
                    name="examen"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="student" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "compte"}
                    name="compte"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="credit card outline" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "financer"}
                    name="financer"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="money bill alternate outline" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "informations"}
                    name="informations"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="globe" />
                </Menu.Item>
                <Menu.Item>
                    <Button
                        circular negative
                        icon='power'
                        onClick={signOut}
                    />
                </Menu.Item>
            </Menu>
        );
    }
}

SidebarTablet.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(SidebarTablet);