// React requirement
import React from 'react';
import { Step, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../styles/headerSteps.style';

const HeaderSteps = props => (
    <div style={Style.container}>
        <Step.Group fluid stackable='tablet' style={Style.stepGroup}>
            <Step inverted>
                <Icon name='hand point up' />
                <Step.Content>
                    <Step.Title>1. Je choisis mon forfait</Step.Title>
                    <Step.Description style={Style.stepDescription}>
                        <Button.Group color="orange" widths={8}>
                            <Button
                                content="Code"
                                onClick={() => props.history.push("/home/forfaitsCode")}
                            />
                            <Button
                                content="Permis"
                                onClick={() => props.history.push("/home/forfaitsPermis")}
                            />
                        </Button.Group>
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step>
                <Icon name='laptop' />
                <Step.Content>
                    <Step.Title>2. J'accède à l'interface ConduiteCenter</Step.Title>
                    <Step.Description style={Style.stepDescription}>
                        <Button
                            color="orange" content="Se connecter"
                            onClick={() => props.history.push("/login")}
                        />
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step>
                <Icon name='trophy' />
                <Step.Content>
                    <Step.Title>3. J'ai mon permis</Step.Title>
                </Step.Content>
            </Step>
        </Step.Group>
    </div>
);

HeaderSteps.propTypes = {
    history: PropTypes.object,
};

export default withRouter(HeaderSteps);
