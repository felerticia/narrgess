// React requirement
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

// Local requirement
import CodePremium from './components/codePremium.component';
import CodeCandidatLibre from './components/codeCandidatLibre.component';

// Style
import Style from './styles/index.style';

const ForfaitsCode = () => (
    <div>
        <Container style={Style.container}>
            <Grid relaxed="very">
                <Grid.Column computer={8} tablet={16} mobile={16} textAlign="center">
                    <CodePremium />
                </Grid.Column>
                <Grid.Column computer={8} tablet={16} mobile={16} textAlign="center">
                    <CodeCandidatLibre />
                </Grid.Column>
            </Grid>
        </Container>
    </div>
);

ForfaitsCode.propTypes = {};

export default ForfaitsCode;