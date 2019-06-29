// React
import React from 'react';
import PropTypes from 'prop-types';

// Local
import DesktopContainer from './desktopContainer.component';
import TabletContainer from './tabletContainer.component';

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <TabletContainer>{children}</TabletContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

export default ResponsiveContainer;