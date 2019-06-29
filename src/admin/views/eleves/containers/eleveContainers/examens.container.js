// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import List from '../../components/examens/list.component';
import Add from '../../components/examens/add.component';

// actions
import { getExamens, getElevePastExamens } from '../../../../../actions/get.action';

class Examens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataNext: {},
            dataPast: {},
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({ loading: true });
        const { id } = this.props.match.params;
        getExamens().then(examens => {
            getElevePastExamens(id).then(dataPast => {
                const filteredExamenKeys = _.filter(Object.keys(examens), key => examens[key].eleves && Object.values(examens[key].eleves).find(el => el.eleve === id));
                const filteredExamens = {};
                filteredExamenKeys.forEach(key => filteredExamens[key] = examens[key]);
                const dataNext = filteredExamens;
                this.setState({ dataNext, dataPast, loading: false });
            })
        });
    }

    render() {
        return (
            <Segment padded loading={this.state.loading}>
                <Header
                    as='h2'
                    textAlign='center'
                    content='Examens'
                />
                <List
                    dataNext={this.state.dataNext}
                    dataPast={this.state.dataPast}
                    fetchData={this.fetchData}
                />
                <Add fetchData={this.fetchData} />
            </Segment>
        );
    }
}

Examens.propTypes = {
    match: PropTypes.object,
};

export default Examens;
