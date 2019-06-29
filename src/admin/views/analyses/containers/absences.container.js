// React
import React, { Component } from 'react';
import { Segment, Header, Grid, Label, Statistic } from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import List from '../components/list.component';

// actions
import { getEleves } from '../../../../actions/get.action';

class Absences extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [],
            total_e: 0,
            total_d: 0,
            loading: true,
            startDate: null,
            endDate: null,
            focusedInput: null,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData(from, to) {
        this.setState({ loading: true });
        getEleves().then(eleves => {
            const data = []; let total_e = 0; let total_d = 0;
            Object.values(eleves).forEach(eleve => {
                const planning = eleve.planning ? eleve.planning : {};
                const cours = _.filter(Object.values(planning), pl => {
                    if (from && to) {
                        if (moment(pl.date) >= from && moment(pl.date) <= to) return true;
                        return false;
                    } else return true;
                });
                const dossier = eleve.dossier ? eleve.dossier : {};
                const eleve_data = dossier.eleve ? dossier.eleve : {};
                const name = eleve_data ? `${eleve_data.nom} ${eleve_data.prenom}` : "";
                let absences_e = 0; let absences_d = 0;
                cours.forEach(pl => {
                    const absence = pl.absence ? pl.absence : "P";
                    if (absence === "E") absences_e += 1;
                    if (absence === "D") absences_d += 1;
                });
                if (absences_e !== 0 || absences_d !== 0) {
                    data.push({
                        "Eleve": name,
                        "Absences excusées": absences_e,
                        "Absences dues": absences_d,
                    });
                    total_e += absences_e; total_d += absences_d;
                }
            });
            this.setState({ data, total_e, total_d, loading: false });
        });
    }

    handleDateChange({ startDate, endDate }) {
        this.fetchData(startDate, endDate);
        this.setState({ startDate, endDate });
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loading}>
                <Label
                    as='a'
                    size='large'
                    icon='arrow left'
                    attached='top left'
                    onClick={() => this.props.history.push('/admin/analyses')}
                />
                <Header as='h2' textAlign='center'>Absences</Header>
                <Segment raised>
                    <Header as='h4'>Filtres Dates</Header>
                    <DateRangePicker
                        block
                        isDayBlocked={() => false}
                        isOutsideRange={() => false}
                        startDate={this.state.startDate}
                        startDateId={this.state.startDate ? this.state.startDate.toString() : ""}
                        endDate={this.state.endDate}
                        endDateId={this.state.endDate ? this.state.endDate.toString() : ""}
                        onDatesChange={this.handleDateChange}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                        startDatePlaceholderText="De :"
                        endDatePlaceholderText="A :"
                    />
                </Segment>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign='center' computer={8} largeScreen={8} tablet={8} widescreen={8} mobile={16}>
                                <Statistic>
                                    <Statistic.Value>{this.state.total_e}</Statistic.Value>
                                    <Statistic.Label>Absences excusées</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column textAlign='center' computer={8} largeScreen={8} tablet={8} widescreen={8} mobile={16}>
                                <Statistic>
                                    <Statistic.Value>{this.state.total_d}</Statistic.Value>
                                    <Statistic.Label>Absences dues</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <List data={this.state.data} />
                </Segment>
            </Segment>
        );
    }
};

Absences.propTypes = {
    history: PropTypes.object,
};

export default Absences;
