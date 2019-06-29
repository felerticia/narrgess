// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Search, Segment, Label, Header, Grid, Dropdown } from 'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker';
import PropTypes from 'prop-types';

// actions
import { getMoniteurs } from '../../../../actions/get.action';
import { addExamen } from '../../../../actions/add.action';

const timeToSeconds = time => {
    const timeArray = time.split(':');
    const h = parseInt(timeArray[0], 10);
    const m = parseInt(timeArray[1], 10);
    return h*3600+m*60;
};

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            date: null,
            dateFocused: false,
            timeStart: "",
            timeEnd: "",
            places: 1,
            lieux: "",
            lieuxPayload: "",
            moniteur: "",
            moniteurs: {},
            loading: true,
            errorMessage: "",
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        getMoniteurs().then(moniteurs => this.setState({ moniteurs, loading: false }));
    }

    handleError() {
        let errorMessage = "";
        if (this.state.type === "") errorMessage = "Il faut donner un type d'examen";
        else if (this.state.date === null) errorMessage = "Il faut donner une date de session";
        else if (this.state.timeStart === "") errorMessage = "Il faut donner une heure de début";
        else if (this.state.timeEnd === "") errorMessage = "Il faut donner une heure de fin";
        else if (timeToSeconds(this.state.timeStart) > timeToSeconds(this.state.timeEnd)) errorMessage = "L'heure de fin doit être après l'heure de début";
        else if (this.state.places < 1) errorMessage = "Il faut au moins une place";
        else if (this.state.lieux === "") errorMessage = "Il faut donner un lieux";
        else if (this.state.moniteur === "") errorMessage = "Il faut donner un moniteur";
        this.setState({ errorMessage });
        return errorMessage.length !== 0;
    }

    handleSelect(adresse) {
        this.setState({ adresse });
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
            addExamen({
                type: this.state.type,
                start: start.toString(),
                end: end.toString(),
                places: this.state.places,
                lieux: this.state.lieux,
                moniteur: this.state.moniteur,
            }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/examens');
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loading}>
                <Label
                    as='a'
                    size='large'
                    icon='arrow left'
                    attached='top left'
                    onClick={() => this.props.history.push('/admin/examens')}
                />
                <Header as='h2' textAlign='center'>Ajouter une session d'examen</Header>
                <Message
                    negative
                    hidden={this.state.errorMessage.length === 0}
                    header="Erreur"
                    content={this.state.errorMessage}
                />
                <Segment>
                    <Form.Field>
                        <Header content="Type" />
                        <Dropdown
                            fluid selection
                            value={this.state.type}
                            onChange={(_, { value }) => this.setState({ type: value })}
                            options={[
                                { key: "Code", value: "Code", text: "Code" },
                                { key: "Conduite", value: "Conduite", text: "Conduite" },
                                { key: "RDV Pédagogique Théorique", value: "RDV Pédagogique Théorique", text: "RDV Pédagogique Théorique" },
                            ]}
                        />
                    </Form.Field>
                    <br />
                    <Form.Field>
                        <Header content="Date" />
                        <SingleDatePicker
                            block
                            isDayBlocked={() => false}
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
                        <Header content="Nombre de places" />
                        <Input
                            fluid
                            type="number"
                            min={1}
                            value={this.state.places}
                            onChange={(_, { value }) => this.setState({ places: parseInt(value, 10) })}
                        />
                    </Form.Field>
                    <br />
                    <Form.Field>
                        <Header content="Lieux" />
                        <PlacesAutocomplete
                            value={this.state.lieuxPayload}
                            onChange={lieuxPayload => this.setState({ lieuxPayload })}
                            onSelect={lieux => this.setState({ lieux, lieuxPayload: lieux })}
                        >
                        {
                            ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                const { onChange } = getInputProps();
                                return (
                                    <Search
                                        value={this.state.lieuxPayload}
                                        open={suggestions.length !== 0 && this.state.lieux.length === 0}
                                        input={{
                                            fluid: true,
                                            placeholder: "Adresse...",
                                            onChange: event => {onChange(event); this.setState({ lieuxPayload: event.target.value, lieux: "" })},
                                        }}
                                        results={suggestions.map(suggestion => ({ title: suggestion.description, suggestion }))}
                                        onResultSelect={(event, data) => {
                                            const { onClick } = getSuggestionItemProps(data.result.suggestion);
                                            onClick(event);
                                        }}
                                    />
                                );
                            }
                        }
                        </PlacesAutocomplete>
                    </Form.Field>
                    <br />
                    <Form.Field>
                        <Header content="Moniteur" />
                        <Dropdown
                            search fluid selection
                            placeholder='Moniteur...'
                            options={Object.keys(this.state.moniteurs).map(moniteurId => ({
                                key: moniteurId,
                                value: moniteurId,
                                text: `${this.state.moniteurs[moniteurId].nom} ${this.state.moniteurs[moniteurId].prenom}`
                            }))}
                            value={this.state.moniteur}
                            onChange={(_, { value }) => this.setState({ moniteur: value })}
                        />
                    </Form.Field>
                </Segment>
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

Add.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
};

export default Add;
