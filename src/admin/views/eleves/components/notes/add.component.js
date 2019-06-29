// React
import React, { Component } from 'react';
import { Segment, Header, Button, Form, TextArea } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// actions
import { addEleveNotes } from '../../../../../actions/add.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        addEleveNotes(id, {
            date: new Date().toString(),
            message: this.state.message,
        }).then(() => {
            this.props.fetchData();
            this.setState({ message: "", loading: false });
        });
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <Header content="Ajouter une note" />
                <Form>
                    <TextArea
                        placeholder="Note ..."
                        value={this.state.message}
                        onChange={(_, { value }) => this.setState({ message: value })}
                    />
                </Form>
                <br />
                <Button
                    fluid positive
                    icon="add"
                    content="Ajouter"
                    onClick={this.handleSubmit}
                />
            </Segment>
        );
    }
};

Add.propTypes = {
    match: PropTypes.object,
    fetchData: PropTypes.func,
};

export default withRouter(Add);