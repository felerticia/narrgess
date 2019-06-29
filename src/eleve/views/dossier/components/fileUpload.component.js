// React
import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getEleveDossierPiece } from '../../../../actions/get.action';
import { editEleveDossierPiece } from '../../../../actions/edit.action';
import { addStorage, getDownloadURL } from '../../../../actions/storage.action';

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            fileName: "",
            loading: true,
        };

        this.uploadFile = this.uploadFile.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getEleveDossierPiece(uid, this.props.pieceRef).then(piece => {
            const fileName = piece.name ? piece.name : "";
            this.setState({ fileName, loading: false });
        });
    }

    uploadFile(e) {
        const { uid } = getLoggedUser();
        const file = e.target.files[0];
        this.setState({ loading: true });
        addStorage(`/eleves/${uid}`, file).then(() => {
            getDownloadURL(`/eleves/${uid}`).then(downloadURL => {
                editEleveDossierPiece(uid, this.props.pieceRef, { url: downloadURL, name: file.name }).then(() => {
                    this.setState({ loading: false });
                });
            });
        })
    }

    render() {
        return (
            <Grid verticalAlign="middle">
                <Grid.Row columns={2} style={{ padding: "7px" }}>
                    <Grid.Column width={14}>
                        <b>{this.props.label}</b><br />
                        {this.state.fileName.length !== 0 && <span>({this.state.fileName})</span>}
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button
                            inverted circular
                            loading={this.state.loading}
                            color='orange'
                            size='tiny'
                            icon='cloud upload'
                            onClick={() => document.getElementById(`input-file-${this.props.pieceRef}`).click()}
                        />
                        <input
                            hidden
                            type="file"
                            id={`input-file-${this.props.pieceRef}`}
                            onChange={this.uploadFile}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

FileUpload.propTypes = {
    label: PropTypes.string,
    pieceRef: PropTypes.string,
}

export default FileUpload;