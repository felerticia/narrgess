// React requirement
import React, { Component } from 'react';
import { Menu, Image, Icon, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from './sidebar.style';

// actions
import { signOut } from '../../../actions/auth.action';

class SidebarTablet extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(_, { name }) {
        this.props.history.push(`/moniteur/${name}`);
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
                    onClick={() => this.props.history.push('/moniteur')}
                >
                    <Image
                        fluid centered
                        bordered={false}
                        src="/img/favicon.png"
                    />
                </Menu.Item>
                <Divider />
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "planning"}
                    name="planning"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="calendar" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "eleves"}
                    name="eleves"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="user" />
                </Menu.Item>
                <Menu.Item
                    active={this.props.location.pathname.split("/")[2] === "compte"}
                    name="compte"
                    style={Style.Item}
                    onClick={this.handleClick}
                >
                    <Icon size="large" name="cog" />
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