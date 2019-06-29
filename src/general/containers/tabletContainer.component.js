// React
import React from 'react';
import { Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import TabletNavbar from '../navbars/tabletNavbar.component';
import TabletFooter from '../footers/tabletFooter.component';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

const TabletContainer = ({ children }) => (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyTablet.maxWidth}>
        <TabletNavbar>
            {children}
            <TabletFooter />
        </TabletNavbar>
    </Responsive>
);
  
TabletContainer.propTypes = {
    children: PropTypes.node,
};

export default TabletContainer;