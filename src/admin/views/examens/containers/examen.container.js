// React
import React, { Component } from 'react';
import { Form, Input, Button, Message, Search, Segment, Label, Header, Grid, Dropdown } from 'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';
import moment from 'moment';

// local
import ListEleves from '../components/listEleves.component';

// actions
import { getExamenBordereau, getMoniteurs, getMoniteursArchives, getExamen } from '../../../../actions/get.action';
import { editExamen } from '../../../../actions/edit.action';
import { deleteExamen } from '../../../../actions/delete.action';
import { convert2pdf } from '../../../../actions/convert.action';

const timeToSeconds = time => {
    const timeArray = time.split(':');
    const h = parseInt(timeArray[0], 10);
    const m = parseInt(timeArray[1], 10);
    return h*3600+m*60;
};

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class Examen extends Component {
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
            eleves: {},
            moniteurs: {},
            loading: true,
            errorMessage: "",
            loadingBordereau: false,
        };

        this.handleError = this.handleError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    UNSAFE_componentWillMount() {
        getMoniteurs().then(moniteurs => {
            getMoniteursArchives().then(archives => {
                getExamen(this.props.match.params.id).then(examen => {
                    const startDate = new Date(examen.start);
                    const endDate = new Date(examen.end);
                    const start = `${addZero(startDate.getHours())}:${addZero(startDate.getMinutes())}`;
                    const end = `${addZero(endDate.getHours())}:${addZero(endDate.getMinutes())}`;
                    this.setState({
                        type: examen.type,
                        date: moment(startDate),
                        timeStart: start,
                        timeEnd: end,
                        places: examen.places,
                        lieux: examen.lieux,
                        lieuxPayload: examen.lieux,
                        moniteur: examen.moniteur,
                        eleves: examen.eleves,
                        moniteurs: {...moniteurs, ...archives},
                        loading: false,
                    });
                });
            });
        });
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
            editExamen(this.props.match.params.id, {
                type: this.state.type,
                start: start.toString(),
                end: end.toString(),
                places: this.state.places,
                lieux: this.state.lieux,
                moniteur: this.state.moniteur,
                eleves: this.state.eleves ? this.state.eleves : {},
            }).then(() => {
                this.setState({ loading: false });
                this.props.history.push('/admin/examens');
            }).catch(err => this.setState({ errorMessage: err.message, loading: false }));
        } else {
            this.setState({ loading: false });
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
        deleteExamen(this.props.match.params.id).then(() => {
            this.setState({ loading: false });
            this.props.history.push('/admin/examens');
        }).catch(err => this.setState({ loading: false, errorMessage: err.message }));
    }

    handleDownload() {
        this.setState({ loadingBordereau: true });
        const { id } = this.props.match.params;
        getExamenBordereau(id).then(data => {
            const { html } = data;
            convert2pdf(html, `bordereau-${id}.pdf`);
            this.setState({ loadingBordereau: false });
        }).catch(() => this.setState({ loadingBordereau: false }));
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
                <Header as='h2' textAlign='center'>Modifier une session d'examen</Header>
                <Message
                    negative
                    hidden={this.state.errorMessage.length === 0}
                    header="Erreur"
                    content={this.state.errorMessage}
                />
                <Button
                    primary fluid
                    loading={this.state.loadingBordereau}
                    icon="file"
                    content="Télécharger le bordereau"
                    onClick={this.handleDownload}
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
                                        time={this.state.timeStart}
                                        onChange={timeStart => this.setState({ timeStart })}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header content="Heure fin" as="h4" />
                                    <TimePicker
                                        time={this.state.timeEnd}
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
                <ListEleves places={this.state.places} />
                <Button
                    fluid positive
                    icon="edit"
                    content="Modifier"
                    onClick={this.handleSubmit}
                />
                <br />
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

Examen.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
};

export default Examen;
