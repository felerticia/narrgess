// React
import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import Filter from './filter.component';
import List from './list.component';

// actions
import { getMoniteurs, getEleves } from '../../../../actions/get.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

const getTotal = object => {
    let total = 0;
    Object.values(object).forEach(val => total += val);
    return total;
};

class ListActivitesMoniteurs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            payload: "",
            data: [],
        };

        this.fetchData = this.fetchData.bind(this);
        this.getCSVHeaders = this.getCSVHeaders.bind(this);
        this.getCSVData = this.getCSVData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.match.params.from, this.props.match.params.to);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.from !== this.props.match.params.from || nextProps.match.params.to !== this.props.match.params.to) {
            this.fetchData(nextProps.match.params.from, nextProps.match.params.to);
        }
    }

    fetchData(from, to) {
        if (from && to) {
            const fromDate = moment(from).toDate();
            const toDate = moment(to).toDate();
            toDate.setHours(0); toDate.setMinutes(0); toDate.setSeconds(0); toDate.setDate(toDate.getDate()+1);
            getMoniteurs().then(moniteurs => {
                getEleves().then(eleves => {
                    const counter = {};
                    Object.keys(moniteurs).forEach(key => counter[key] = {});
                    Object.values(eleves).forEach(eleve => {
                        const planning = eleve.planning ? eleve.planning : {};
                        const currentDate = new Date(fromDate);
                        while (currentDate < toDate) {
                            const key = `${addZero(currentDate.getDate())}/${addZero(currentDate.getMonth()+1)}/${currentDate.getFullYear()}`;
                            Object.keys(moniteurs).forEach(moniteurId => counter[moniteurId][key] = counter[moniteurId][key] ? counter[moniteurId][key] : 0);
                            const filteredPlanning = _.filter(planning, pl => {
                                const date = moment(pl.date).toDate();
                                return date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
                            });
                            filteredPlanning.forEach(hour => {
                                if (hour.moniteur && moniteurs[hour.moniteur]) {
                                    counter[hour.moniteur][key] += 1;
                                }
                            });
                            currentDate.setDate(currentDate.getDate() + 1);
                        }
                    });
                    const data = [];
                    Object.keys(counter).forEach(moniteur => {
                        data.push({
                            moniteurId: moniteur,
                            moniteur: `${moniteurs[moniteur].nom} ${moniteurs[moniteur].prenom}`,
                            total: getTotal(counter[moniteur]),
                            ...counter[moniteur],
                        });
                    });
                    this.setState({ data, loading: false, });
                });
            });
        } else {
            this.setState({ loading: false });
        }
    }

    getCSVHeaders() {
        const { from, to } = this.props.match.params;
        const headers = [];
        if (from && to) {
            const fromDate = moment(from).toDate();
            const toDate = moment(to).toDate();
            toDate.setHours(0); toDate.setMinutes(0); toDate.setSeconds(0);
            const current = fromDate;
            headers.push({ label: "Moniteur", key: "moniteur" });
            while (current < toDate) {
                const key = `${addZero(current.getDate())}/${addZero(current.getMonth()+1)}/${current.getFullYear()}`;
                headers.push({
                    key,
                    label: key,
                });
                current.setDate(current.getDate() + 1);
            }
            headers.push({ label: "Total", key: "total" });
        }
        return headers;
    }

    getCSVData() {
        return this.state.data;
    }

    render() {
        const headers = this.getCSVHeaders();
        const data = this.getCSVData();
        return (
            <Segment basic loading={this.state.loading}>
                <Filter />
                <br />
                {
                    this.props.match.params.from && this.props.match.params.to ? 
                    <List
                        celled
                        data={data}
                        headers={headers}
                        csvName="activites-moniteurs.csv"
                    /> :
                    <Message
                        info
                        header="Information"
                        content="Il faut d'abord donner une période"
                    />
                }
            </Segment>
        );
    }
}

ListActivitesMoniteurs.propTypes = {
    match: PropTypes.object,
};

export default ListActivitesMoniteurs;