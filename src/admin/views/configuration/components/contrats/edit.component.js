// React
import React, { Component } from 'react';
import { Segment, Divider, Header, Button, Input } from 'semantic-ui-react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// actions
import { getContrat } from '../../../../../actions/get.action';
import { editContrat } from '../../../../../actions/edit.action';
import { deleteContrat } from '../../../../../actions/delete.action';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            name: "",
            editorState: EditorState.createEmpty(),
        };

        this.handleSave = this.handleSave.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        getContrat(id).then(contrat => {
            const { nom, content } = contrat;
            const contentBlock = htmlToDraft(content);
            let editorState = null;
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                editorState = EditorState.createWithContent(contentState);
            } else {
                editorState = EditorState.createEmpty();
            }
            this.setState({
                name: nom,
                editorState,
                loading: false,
            });
        });
    }

    handleSave() {
        if (this.state.name && this.state.name.length !== 0) {
            const { editorState } = this.state;
            const content = editorState.getCurrentContent();
            const raw = convertToRaw(content);
            const html = draftToHtml(raw);
            this.setState({ loading: true });
            editContrat(this.props.match.params.id, { nom: this.state.name, content: html }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/contrats');
            });
        }
    }

    toggleConfirm() {
        confirmAlert({
            title: "Supprimer",
            message: "Voulez-vous vraiment supprimer cette donnée ?",
            buttons: [
                { label: "Oui", onClick: this.handleDelete },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete() {
        this.setState({ loading: true });
        deleteContrat(this.props.match.params.id).then(() => {
            this.setState({ loading: false });
            this.props.history.push('/admin/configuration/contrats');
        });
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Header
                    textAlign="center"
                    icon="signup"
                    content={this.state.name}
                />            
                <Divider />
                <Input
                    fluid
                    label="Nom :"
                    value={this.state.name}
                    onChange={(_, { value }) => this.setState({ name: value })}
                />
                <Segment>
                    <Editor
                        editorState={this.state.editorState}
                        onEditorStateChange={editorState => this.setState({ editorState })}
                    />
                    <Divider />
                    <Button
                        fluid positive
                        icon="save"
                        content="Enregistrer"
                        onClick={this.handleSave}
                    />
                </Segment>
                <Button
                    fluid negative
                    icon="trash"
                    content="Supprimer"
                    onClick={this.toggleConfirm}
                />
            </Segment>
        );
    }
}

Edit.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
};

export default Edit;