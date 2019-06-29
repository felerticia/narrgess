// React
import React from 'react';
import { Embed } from 'semantic-ui-react';
import { withRouter } from 'react-router';

const YoutubeVideos = props => (
    <div>
        <Embed
            brandedUI
            id="VaVaccLXpYo"
            placeholder="https://i.ytimg.com/vi/VaVaccLXpYo/hqdefault.jpg"
            source="youtube"
        />
        <a style={{ textAlign: "right" }} onClick={() => props.history.push(`/eleve/informations`)}>Voir la suite ...</a>
    </div>
);

export default withRouter(YoutubeVideos);
