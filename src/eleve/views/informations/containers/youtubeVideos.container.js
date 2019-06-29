// React
import React from 'react';
import { Grid, Segment, Embed } from 'semantic-ui-react';

const videos = [
    { id: "VaVaccLXpYo", source: "youtube" },
    { id: "aYSWxH0b2oM", source: "youtube" },
    { id: "PjW-WbFbs7s", source: "youtube" },
    { id: "qMOuU-KoT0w", source: "youtube" },
    { id: "tCEaqfSdv04", source: "youtube" },
]

const YoutubeVideos = () => (
    <Segment raised color="orange">
        <Grid divided>
        {
            videos.map(video => (
                <Grid.Column computer={8} tablet={8} mobile={16} key={video.id}>
                    <Embed
                        brandedUI
                        id={video.id}
                        placeholder={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        source={video.source}
                    />
                </Grid.Column>
            ))
        }
        </Grid>
    </Segment>
);

export default YoutubeVideos;
