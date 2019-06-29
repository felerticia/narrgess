// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import List from '../../components/estimations/list.component';

// actions
import { getEleveEstimations, getMoniteurs } from '../../../../../actions/get.action';
import { editEleveEstimation } from '../../../../../actions/edit.action';

class Estimations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loadingData: true,
            moniteurs: {},
            loadingMoniteurs: true,
        };

        this.setEstimationViewed = _.debounce(this.setEstimationViewed.bind(this), 5000);
    }

    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        getMoniteurs().then(moniteurs => this.setState({ moniteurs, loadingMoniteurs: false }));
        getEleveEstimations(id).then(data => {
            this.setEstimationViewed(data);
            this.setState({ data, loadingData: false });
        });
    }

    setEstimationViewed(estimations) {
        const { id } = this.props.match.params;
        Object.keys(estimations).forEach(key => editEleveEstimation(id, key, { viewed: true }));
    }

    render() {
        return (
            <Segment padded loading={this.state.loadingData || this.state.loadingMoniteurs}>
                <Header
                    as='h2'
                    textAlign='center'
                    content='Estimations'
                />
                <List
                    data={this.state.data}
                    moniteurs={this.state.moniteurs}
                />
            </Segment>
        );
    }
}

Estimations.propTypes = {
    match: PropTypes.object,
};

export default Estimations;
