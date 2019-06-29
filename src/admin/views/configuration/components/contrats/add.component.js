// React
import React, { Component } from 'react';
import { Segment, Divider, Header, Button, Input, Message } from 'semantic-ui-react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';

// actions
import { addContrat } from '../../../../../actions/add.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: "",
            editorState: EditorState.createEmpty(),
            errMessage: "",
        };

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        this.setState({ loading: true });
        if (this.state.name && this.state.name.length !== 0) {
            const { editorState } = this.state;
            const content = editorState.getCurrentContent();
            const raw = convertToRaw(content);
            const html = draftToHtml(raw);
            addContrat({ nom: this.state.name, content: html }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/configuration/contrats');
            });
        } else {
            this.setState({
                loading: false,
                errMessage: "Il faut donner un nom",
            });
        }
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Message
                    negative
                    icon="warning"
                    header="Erreur"
                    content={this.state.errMessage}
                    hidden={this.state.errMessage.length === 0}
                />
                <Header
                    textAlign="center"
                    icon="signup"
                    content="Nouveau contrat"
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
            </Segment>
        );
    }
}

Add.propTypes = {
    history: PropTypes.object,
};

export default Add;