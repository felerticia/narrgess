// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import Planning from '../../components/planning/planning.component';
import Bilan from '../../components/planning/bilan.component';

// actions
import { getElevePlanning, getEleveAbsences } from '../../../../../actions/get.action';

class PlanningEleve extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planning: {},
            loadingPlanning: true,
            absences: {},
            loadingAbsences: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { id } = this.props.match.params;
        getElevePlanning(id).then(planning => this.setState({ planning, loadingPlanning: false }));
        getEleveAbsences(id).then(absences => this.setState({ absences, loadingAbsences: false }));
    }

    render() {
        return (
            <Segment padded loading={this.state.loadingPlanning || this.state.loadingAbsences}>
                <Header
                    as='h2'
                    textAlign='center'
                    content='Planning élève'
                />
                <Segment raised color='orange'>
                    <Header textAlign='left'>Planning des cours</Header>
                    <Planning
                        data={this.state.planning}
                        absences={this.state.absences}
                        fetchData={this.fetchData}
                    />
                </Segment>
                <Segment raised color='orange'>
                    <Header textAlign='left'>Bilan des cours</Header>
                    <Bilan data={this.state.planning} absences={this.state.absences} />
                </Segment>
            </Segment>
        );
    }
}

PlanningEleve.propTypes = {
    match: PropTypes.object,
};

export default PlanningEleve;
