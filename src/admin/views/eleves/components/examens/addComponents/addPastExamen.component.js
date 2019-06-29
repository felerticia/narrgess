// React
import React, { Component } from 'react';
import { Form, Segment, Header, Grid, Dropdown, Button, Message } from 'semantic-ui-react';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// actions
import { addElevePastExams } from '../../../../../../actions/add.action';

const timeToSeconds = time => {
    const timeArray = time.split(':');
    const h = parseInt(timeArray[0], 10);
    const m = parseInt(timeArray[1], 10);
    return h*3600+m*60;
};

class AddPastExamen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            date: null,
            dateFocused: false,
            timeStart: "",
            timeEnd: "",
            resultat: "",
            loading: false,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleError() {
        let errorMessage = "";
        if (this.state.type === "") errorMessage = "Il faut donner un type d'examen";
        else if (this.state.date === null) errorMessage = "Il faut donner une date de session";
        else if (this.state.timeStart === "") errorMessage = "Il faut donner une heure de début";
        else if (this.state.timeEnd === "") errorMessage = "Il faut donner une heure de fin";
        else if (timeToSeconds(this.state.timeStart) > timeToSeconds(this.state.timeEnd)) errorMessage = "L'heure de fin doit être après l'heure de début";
        else if (this.state.resultat === "") errorMessage = "Il faut donner un résultat";
        this.setState({ errorMessage });
        return errorMessage.length !== 0;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const error = this.handleError();
        if (!error) {
            const start = new Date(this.state.date);
            const end = new Date(this.state.date);
            const hourStart = parseInt(this.state.timeStart.split(":")[0], 10);
            const minuteStart = parseInt(this.state.timeStart.split(":")[1], 10);
            const hourEnd = parseInt(this.state.timeEnd.split(":")[0], 10);
            const minuteEnd = parseInt(this.state.timeEnd.split(":")[1], 10);
            start.setHours(hourStart); start.setMinutes(minuteStart);
            end.setHours(hourEnd); end.setMinutes(minuteEnd);
            addElevePastExams(this.props.match.params.id, {
                type: this.state.type,
                start: start.toString(),
                end: end.toString(),
                resultat: this.state.resultat,
            }).then(() => {
                this.setState({ loading: false });
                this.props.reset();
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Message
                    negative
                    hidden={this.state.errorMessage.length === 0}
                    header="Erreur"
                    content={this.state.errorMessage}
                />
                <Form.Field>
                    <Header content="Type" />
                    <Dropdown
                        fluid selection
                        value={this.state.type}
                        onChange={(_, { value }) => this.setState({ type: value })}
                        options={[
                            { key: "Code", value: "Code", text: "Code" },
                            { key: "Conduite", value: "Conduite", text: "Conduite" },
                        ]}
                    />
                </Form.Field>
                <br />
                <Form.Field>
                    <Header content="Date" />
                    <SingleDatePicker
                        block
                        isDayBlocked={date => date >= new Date()}
                        isOutsideRange={() => false}
                        date={this.state.date}
                        id={this.state.date ? this.state.date.toString() : ""}
                        onDateChange={date => this.setState({ date })}
                        focused={this.state.dateFocused}
                        onFocusChange={({ focused }) => this.setState({ dateFocused: focused })}
                        placeholder="Le :"
                    />
                </Form.Field>
                <br />
                <Form.Field>
                    <Header content="Horaires" />
                    <Grid centered textAlign='center' verticalAlign='middle' columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header content="Heure début" as="h4" />
                                <TimePicker
                                    value={this.state.timeStart}
                                    onChange={timeStart => this.setState({ timeStart })}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Header content="Heure fin" as="h4" />
                                <TimePicker
                                    value={this.state.timeEnd}
                                    onChange={timeEnd => this.setState({ timeEnd })}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form.Field>
                <br />
                <Form.Field>
                    <Header content="Résultat" />
                    <Dropdown
                        fluid selection
                        placeholder="Résultat..."
                        value={this.state.resultat}
                        onChange={(_, { value }) => this.setState({ resultat: value })}
                        options={[
                            { key: "Obtenu", value: "Obtenu", text: "Obtenu" },
                            { key: "Ajourné", value: "Ajourné", text: "Ajourné" },
                        ]}
                    />
                </Form.Field>
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
}

AddPastExamen.propTypes = {
    reset: PropTypes.func,
    match: PropTypes.object,
};

export default withRouter(AddPastExamen);