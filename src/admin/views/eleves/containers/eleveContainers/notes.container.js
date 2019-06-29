// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import List from '../../components/notes/list.component';
import Add from '../../components/notes/add.component';

// actions
import { getEleveNotes } from '../../../../../actions/get.action';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {},
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }
    
    fetchData() {
        this.setState({ loading: true });
        const { id } = this.props.match.params;
        getEleveNotes(id).then(data => this.setState({ data, loading: false }));
    }

    render() {
        return (
            <Segment padded loading={this.state.loading}>
                <Header
                    as='h2'
                    textAlign='center'
                    content='Notes'
                />
                <List data={this.state.data} />
                <Add fetchData={this.fetchData} />
            </Segment>
        );
    }
}

Notes.propTypes = {
    match: PropTypes.object,
};

export default Notes;
