// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';

const addZeros = number => number < 10 ? `0${number}` : `${number}`;

const dateToYMD = date => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    return `${year}-${addZeros(month)}-${addZeros(day)}`;
};

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    
    UNSAFE_componentWillMount() {
        const { from, to } = this.props.match.params;
        this.setState({
            startDate: from ? moment(from) : null,
            endDate: to ? moment(to) : null,
        });
    }

    handleChangeDate({ startDate, endDate }) {
        const routeArray = this.props.location.pathname.split('/');
        const route1 = routeArray[2];
        const route2 = routeArray[3];
        if (startDate && endDate) {
            const from = dateToYMD(startDate._d);
            const to = dateToYMD(endDate._d);
            this.props.history.push(`/admin/${route1}/${route2}/${from}/${to}`);
        } else if (startDate === null && endDate === null) {
            this.props.history.push(`/admin/${route1}/${route2}/list}`)
        }
        this.setState({ startDate, endDate });
    }

    render() {
        return (
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
                    onDatesChange={this.handleChangeDate}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    startDatePlaceholderText="De :"
                    endDatePlaceholderText="A :"
                />
            </Segment>
        );
    }
}

Filter.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
};

export default withRouter(Filter);