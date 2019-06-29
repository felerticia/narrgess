// React
import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

// Style
import Style from './style';

const Code = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="drivers license"
                content="Code"
                subheader="Je révise l'examen du code en ligne"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <Segment raised>
                    <iframe
                        style={Style.Iframe}
                        title="code iframe"
                        src="https://sso.enpc-center.fr/cas/login?service=http%3A%2F%2Fwww.prepacode-enpc.fr%2F%23"
                    />
                </Segment>
            </Segment>
        </Container>
    </div>
);

export default Code;