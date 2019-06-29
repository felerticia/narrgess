// React
import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// Style
import Style from '../styles/index.style';

const MenuPermis = props => (
    <div style={Style.menuPermis}>
        <Menu pointing attached widths={4}>
            <Menu.Item
                content="Permis Manuel"
                active={props.location.pathname.split("/")[3] === "permisManuel"}
                onClick={() => props.history.push('/home/forfaitsPermis/permisManuel')}
            />
            <Menu.Item
                content="Permis Automatique"
                active={props.location.pathname.split("/")[3] === "permisAutomatique"}
                onClick={() => props.history.push('/home/forfaitsPermis/permisAutomatique')}
            />
            <Menu.Item
                content="Annulation de permis"
                active={props.location.pathname.split("/")[3] === "annulationPermis"}
                onClick={() => props.history.push('/home/forfaitsPermis/annulationPermis')}
            />
            <Menu.Item
                content="Conduite Accompagnée AAC"
                active={props.location.pathname.split("/")[3] === "conduiteAccompagnee"}
                onClick={() => props.history.push('/home/forfaitsPermis/conduiteAccompagnee')}
            />
        </Menu>
    </div>
);

MenuPermis.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(MenuPermis);
