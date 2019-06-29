// React requirement
import React from 'react';
import { Segment } from 'semantic-ui-react';

// Local requirements
import HeaderSteps from '../components/headerSteps.component';
import HeaderSlide from '../components/headerSlide.component';

// Style
import Style from '../styles/header.style';

const Header = () => (
    <div>
        <Segment vertical inverted color="orange" textAlign="center" style={Style.segment}>
            <HeaderSlide />
        </Segment>
        <HeaderSteps />
    </div>
);

export default Header;
