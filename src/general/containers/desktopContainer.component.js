// React
import React from 'react';
import { Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import DesktopNavbar from '../navbars/desktopNavbar.component';
import DesktopFooter from '../footers/desktopFooter.component';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

const DesktopContainer = ({ children }) => (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyComputer.minWidth}>
        <DesktopNavbar />
        <div style={{ marginTop: "5em" }}>{children}</div>
        <DesktopFooter />
    </Responsive>
);
  
DesktopContainer.propTypes = {
    children: PropTypes.node,
};

export default DesktopContainer;