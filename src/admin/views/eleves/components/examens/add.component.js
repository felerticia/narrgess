// React
import React, { Component } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Local
import AddNextExamen from './addComponents/addNextExamen.component';
import AddPastExamen from './addComponents/addPastExamen.component';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
        };

        this.reset = this.reset.bind(this);
    }

    reset() {
        this.props.fetchData();
        this.setState({ type: "" });
    }

    render() {
        return (
            <Segment>
                <Header content="Ajouter un examen" />
                <Button.Group fluid>
                    <Button
                        icon="add"
                        content="Examen futur"
                        active={this.state.type === "next"}
                        onClick={() => this.setState({ type: "next" })}
                    />
                    <Button.Or text='ou' />
                    <Button
                        icon="undo"
                        content="Examen passé"
                        active={this.state.type === "past"}
                        onClick={() => this.setState({ type: "past" })}
                    />
                </Button.Group>
                {
                    this.state.type === "next" ? <AddNextExamen reset={this.reset} /> :
                    this.state.type === "past" ? <AddPastExamen reset={this.reset} /> :
                    null
                }
            </Segment>
        );
    }
};

Add.propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
    fetchData: PropTypes.func,
};

export default withRouter(Add);