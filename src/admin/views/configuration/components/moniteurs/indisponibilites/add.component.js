// React
import React, { Component } from 'react';
import { Segment, Button, Grid, Checkbox, Input, Message, Header } from 'semantic-ui-react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import TimePicker from 'react-time-picker';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { addMoniteurIndisponibilites } from '../../../../../../actions/add.action';

const getDates = ({ regulier, period, startDate, endDate, singleDate, timeStart, timeEnd }) => {
    const date1 = period ? new Date(startDate ? startDate._d : startDate) : new Date(singleDate ? singleDate._d : singleDate);
    const date2 = period ? new Date(endDate ? endDate._d : endDate) : new Date(singleDate ? singleDate._d : singleDate);
    const timeStartArray = timeStart.split(':');
    const timeEndArray = timeEnd.split(':');
    const hours1 = !regulier && period ? 0 : parseInt(timeStartArray[0], 10);
    const minutes1 = !regulier && period ? 0 : parseInt(timeStartArray[1], 10);
    const hours2 = !regulier && period ? 23 : parseInt(timeEndArray[0], 10);
    const minutes2 = !regulier && period ? 59 : parseInt(timeEndArray[1], 10);
    date1.setHours(hours1); date1.setMinutes(minutes1); date1.setSeconds(0);
    date2.setHours(hours2); date2.setMinutes(minutes2); date2.setSeconds(0);
    return {
        startDate: date1.toString().substring(0, 24),
        endDate: date2.toString().substring(0, 24),
    };
};

const timeToSeconds = time => {
    const timeArray = time.split(':');
    const h = parseInt(timeArray[0], 10);
    const m = parseInt(timeArray[1], 10);
    return h*3600+m*60;
};

class AddIndisponibilites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            motif: "",
            regulier: true,
            period: true,
            startDate: null,
            endDate: null,
            focusedDate: null,
            singleDate: null,
            singleFocused: false,
            timeStart: "",
            timeEnd: "",
            days: [],
            errMessage: "",
            loading: false,
        };

        this.triggerDayIndisponibilite = this.triggerDayIndisponibilite.bind(this);
        this.addIndisponibilite = this.addIndisponibilite.bind(this);
    }

    triggerDayIndisponibilite(day) {
        const { days } = this.state;
        if (days.find(o => o === day)) {
            days.splice(days.indexOf(day), 1);
        } else {
            days.push(day);
        }
        this.setState({ days });
    }

    addIndisponibilite() {
        this.setState({ loading: true });
        if (this.state.motif.length === 0) this.setState({ loading: false, errMessage: "Il faut donner un motif" });
        else if (this.state.regulier && this.state.days.length === 0) this.setState({ loading: false, errMessage: "Il faut selectionner au moins un jour" });
        else if ((this.state.regulier || !this.state.period) && (this.state.timeStart.length === 0 || this.state.timeEnd.length === 0)) this.setState({ loading: false, errMessage: "Il faut donner l'horaire" });
        else if ((this.state.regulier || !this.state.period) && timeToSeconds(this.state.timeStart) > timeToSeconds(this.state.timeEnd)) this.setState({ loading: false, errMessage: "L'heure de fin doit être après l'heure de début" });
        else if (this.state.period && !this.state.startDate) this.setState({ loading: false, errMessage: "Il faut donner une date de début" });
        else if (this.state.period && !this.state.endDate) this.setState({ loading: false, errMessage: "Il faut donner une date de fin" });
        else if (!this.state.period && !this.state.singleDate) this.setState({ loading: false, errMessage: "Il faut donner une date" });
        else {
            let promise = null;
            const { startDate, endDate } = getDates(this.state);
            if (this.state.regulier) {
                const { days } = this.state;
                days.forEach(day => {
                    promise = addMoniteurIndisponibilites(this.props.match.params.id, {
                        day,
                        startDate,
                        endDate,
                        motif: this.state.motif,
                        regulier: true,
                    });
                });
            } else {
                promise = addMoniteurIndisponibilites(this.props.match.params.id, {
                    startDate,
                    endDate,
                    motif: this.state.motif,
                    regulier: false,
                });
            }
            promise.then(() => {
                this.setState({ loading: false });
                this.props.toggleAdd();
            });
        }
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <Message
                    negative
                    icon='warning'
                    header='Erreur'
                    content={this.state.errMessage}
                    hidden={this.state.errMessage.length === 0}
                />
                <Input
                    fluid
                    label="Motif"
                    value={this.state.motif}
                    onChange={(_, { value }) => this.setState({ motif: value })}
                />
                <br />
                <Checkbox
                    radio
                    checked={this.state.regulier}
                    label="Régulière"
                    onClick={() => this.setState({ regulier: true })}
                />
                &nbsp;&nbsp;&nbsp;
                <Checkbox
                    radio
                    checked={!this.state.regulier}
                    label="Occasionnelle"
                    onClick={() => this.setState({ regulier: false })}
                />
                <br /><br />
                {
                    this.state.regulier ?
                    <DateRangePicker
                        block
                        isDayBlocked={() => false}
                        isOutsideRange={() => false}
                        startDate={this.state.startDate}
                        startDateId={this.state.startDate ? this.state.startDate.toString() : ""}
                        endDate={this.state.endDate}
                        endDateId={this.state.endDate ? this.state.endDate.toString() : ""}
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                        focusedInput={this.state.focusedDate}
                        onFocusChange={focusedDate => this.setState({ focusedDate })}
                        startDatePlaceholderText="Du :"
                        endDatePlaceholderText="Au :"
                    /> :
                    <div>
                        <Checkbox
                            radio
                            checked={this.state.period}
                            label="Sur une période"
                            onClick={() => this.setState({ period: true })}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <Checkbox
                            radio
                            checked={!this.state.period}
                            label="Sur un jour"
                            onClick={() => this.setState({ period: false })}
                        />
                        <br />
                    </div>
                }
                <br />
                <Grid stackable centered columns={this.state.regulier || !this.state.period ? 3 : 1}>
                    <Grid.Row>
                        <Grid.Column>
                        {
                            !this.state.regulier ?
                            this.state.period ?
                            <DateRangePicker
                                block
                                isDayBlocked={() => false}
                                isOutsideRange={() => false}
                                startDate={this.state.startDate}
                                startDateId={this.state.startDate ? this.state.startDate.toString() : ""}
                                endDate={this.state.endDate}
                                endDateId={this.state.endDate ? this.state.endDate.toString() : ""}
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                focusedInput={this.state.focusedDate}
                                onFocusChange={focusedDate => this.setState({ focusedDate })}
                                startDatePlaceholderText="Du :"
                                endDatePlaceholderText="Au :"
                            /> :
                            <SingleDatePicker
                                block
                                isDayBlocked={() => false}
                                isOutsideRange={() => false}
                                id={this.state.singleDate ? this.state.singleDate.toString() : ""}
                                date={this.state.singleDate}
                                onDateChange={singleDate => this.setState({ singleDate })}
                                focused={this.state.singleFocused}
                                onFocusChange={({ focused }) => this.setState({ singleFocused: focused })}
                                placeholder="Le :"
                            />
                            :
                            <Grid centered textAlign='center' verticalAlign='middle' columns={2}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Checkbox
                                            checked={this.state.days.find(o => o === 'Lundi')}
                                            label='Lundi'
                                            onClick={() => this.triggerDayIndisponibilite('Lundi')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Checkbox
                                            checked={this.state.days.find(o => o === 'Mardi')}
                                            label='Mardi'
                                            onClick={() => this.triggerDayIndisponibilite('Mardi')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Checkbox
                                            checked={this.state.days.find(o => o === 'Mercredi')}
                                            label='Mercredi'
                                            onClick={() => this.triggerDayIndisponibilite('Mercredi')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Checkbox
                                            checked={this.state.days.find(o => o === 'Jeudi')}
                                            label='Jeudi'
                                            onClick={() => this.triggerDayIndisponibilite('Jeudi')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Checkbox
                                            checked={this.state.days.find(o => o === 'Vendredi')}
                                            label='Vendredi'
                                            onClick={() => this.triggerDayIndisponibilite('Vendredi')}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Checkbox
                                            checked={this.state.days.find(o => o === 'Samedi')}
                                            label='Samedi'
                                            onClick={() => this.triggerDayIndisponibilite('Samedi')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        }
                        </Grid.Column>
                        {
                            (this.state.regulier || !this.state.period) &&
                            <Grid.Column>
                                <Header content="Heure début" as="h4" />
                                <TimePicker
                                    value={this.state.timeStart}
                                    onChange={timeStart => this.setState({ timeStart })}
                                />
                            </Grid.Column>
                        }
                        {
                            (this.state.regulier || !this.state.period) &&
                            <Grid.Column>
                                <Header content="Heure fin" as="h4" />
                                <TimePicker
                                    value={this.state.timeEnd}
                                    onChange={timeEnd => this.setState({ timeEnd })}
                                />
                            </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>
                <br />
                <Button
                    positive
                    content="Ajouter"
                    onClick={this.addIndisponibilite}
                />
            </Segment>
        );
    }
}

AddIndisponibilites.propTypes = {
    match: PropTypes.object,
    toggleAdd: PropTypes.func,
};

export default withRouter(AddIndisponibilites);
