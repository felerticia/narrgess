// React requirement
import React from 'react';
import { Menu, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const DesktopNavbar = props => (
    <Menu borderless fixed="top">
        <Menu.Item>
            <Image
                bordered={false} size="medium"
                src="/img/logo-complete.png"
                onClick={() => props.history.push("/")}
            />
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item
                content="Code de la route"
                active={props.location.pathname.split("/")[2] === "forfaitsCode"}
                onClick={() => props.history.push("/home/forfaitsCode")}
            />
            <Menu.Item
                content="Permis de conduire"
                active={props.location.pathname.split("/")[2] === "forfaitsPermis"}
                onClick={() => props.history.push("/home/forfaitsPermis")}
            />
            <Menu.Item
                content="Nos Agences"
                active={props.location.pathname.split("/")[2] === "team"}
                onClick={() => props.history.push("/home/team")}
            />
            <Menu.Item>
                <Button
                    inverted color="orange"
                    size="big" content="Inscription"
                    onClick={() => props.history.push("/signin")}
                />
                <Button
                    color="orange" style={{ marginLeft: "0.5em" }}
                    size="big" content="Connexion"
                    onClick={() => props.history.push("/login")}
                />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

DesktopNavbar.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(DesktopNavbar);
