// React
import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FileDownload = props => (
    <Grid verticalAlign="middle">
        <Grid.Row columns={2} style={{ padding: "7px" }}>
            <Grid.Column width={14}>
                <b>{props.label}</b><br />
                {props.data.name && props.data.name.length !== 0 && <span>({props.data.name})</span>}
            </Grid.Column>
            <Grid.Column width={2}>
                <Button
                    positive
                    size='tiny'
                    icon='cloud download'
                    disabled={!(props.data.name && props.data.name.length !== 0)}
                    onClick={() => props.data.url && window.open(props.data.url, "_blank")}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

FileDownload.propTypes = {
    label: PropTypes.string,
    pieceRef: PropTypes.string,
    data: PropTypes.object,
}

export default FileDownload;