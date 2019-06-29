// React
import React from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

// Local
import YoutubeVideos from './containers/youtubeVideos.container';

const Informations = () => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="globe"
                content="Informations"
                subheader="L'actu du réseau Conduite Center"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <YoutubeVideos />
            </Segment>
        </Container>
    </div>
);

export default Informations;