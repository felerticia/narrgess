// React requirement
import React, { Component } from 'react';
import { Menu, Button, Image, Sidebar, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class TabletNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarOpened: false,
        };
    }

    render() {
        return (
            <Sidebar.Pushable>
                <Sidebar
                    inverted as={Menu} animation="push" vertical
                    onHide={() => this.setState({ sidebarOpened: false })}
                    visible={this.state.sidebarOpened}
                >
                    <Menu.Item>
                        <Image
                            centered bordered={false} size="medium"
                            src="/img/logo-inverted.png"
                            onClick={() => {this.props.history.push("/"); this.setState({ sidebarOpened: false });}}
                        />
                    </Menu.Item>
                    <Menu.Item
                        content="Code de la route"
                        active={this.props.location.pathname.split("/")[2] === "forfaitsCode"}
                        onClick={() => {this.props.history.push("/home/forfaitsCode"); this.setState({ sidebarOpened: false });}}
                    />
                    <Menu.Item
                        content="Permis de conduire"
                        active={this.props.location.pathname.split("/")[2] === "forfaitsPermis"}
                        onClick={() => {this.props.history.push("/home/forfaitsPermis"); this.setState({ sidebarOpened: false });}}
                    />
                    <Menu.Item
                        content="Nos Agences"
                        active={this.props.location.pathname.split("/")[2] === "team"}
                        onClick={() => {this.props.history.push("/home/team"); this.setState({ sidebarOpened: false });}}
                    />
                    <Menu.Item>
                        <Button
                            inverted fluid
                            color="orange" size="big"
                            content="Inscription"
                            onClick={() => {this.props.history.push("/signin"); this.setState({ sidebarOpened: false });}}
                        />
                        <Button
                            fluid color="orange"
                            content="Connexion"
                            size="big" style={{ marginTop: "0.5em" }}
                            onClick={() => {this.props.history.push("/login"); this.setState({ sidebarOpened: false });}}
                        />
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <Menu borderless style={{ margin: "0" }}>
                        <Menu.Item onClick={() => this.setState({ sidebarOpened: !this.state.sidebarOpened })}>
                            <Icon name="sidebar" />
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Image
                                bordered={false} size="small"
                                src="/img/logo-complete.png"
                                onClick={() => this.props.history.push("/")}
                            />
                        </Menu.Item>
                    </Menu>
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

TabletNavbar.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.node,
};

export default withRouter(TabletNavbar);
