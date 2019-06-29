// React
import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MenuTeam = props => (
    <Menu pointing secondary fluid color="orange" widths={6}>
        <Menu.Item
            name="Montpellier" active={props.activeAgence === "Montpellier"}
            onClick={(_, { name }) => props.handleChangeActiveAgence(name)}
        />
        <Menu.Item
            name="Lyon 6" active={props.activeAgence === "Lyon 6"}
            onClick={(_, { name }) => props.handleChangeActiveAgence(name)}
        />
        <Menu.Item
            name="Lyon 7" active={props.activeAgence === "Lyon 7"}
            onClick={(_, { name }) => props.handleChangeActiveAgence(name)}
        />
        <Menu.Item
            name="Villeurbanne" active={props.activeAgence === "Villeurbanne"}
            onClick={(_, { name }) => props.handleChangeActiveAgence(name)}
        />
        <Menu.Item
            name="Clermont-Ferrand" active={props.activeAgence === "Clermont-Ferrand"}
            onClick={(_, { name }) => props.handleChangeActiveAgence(name)}
        />
        <Menu.Item
            name="Grenoble" active={props.activeAgence === "Grenoble"}
            onClick={(_, { name }) => props.handleChangeActiveAgence(name)}
        />
    </Menu>
);

MenuTeam.propTypes = {
    activeAgence: PropTypes.string,
    handleChangeActiveAgence: PropTypes.func,
};

export default MenuTeam;