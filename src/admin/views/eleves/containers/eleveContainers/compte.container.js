// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import Add from '../../components/compte/add.component';
import Details from '../../components/compte/details.component';
import Bilan from '../../components/compte/bilan.component';

// actions
import { getEleveCompte } from '../../../../../actions/get.action'

class CompteEleve extends Component {
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
        getEleveCompte(this.props.match.params.id).then(data => this.setState({ data, loading: false }));
    }

    render() {
        return (
            <Segment padded loading={this.state.loading}>
                <Header
                    as='h2'
                    textAlign='center'
                    content='Compte élève'
                />
                <Segment raised color='orange'>
                    <Header textAlign='left'>Ajouter des ventes/encaissements/impayés/remboursements</Header>
                    <Add fetchData={this.fetchData} />
                </Segment>
                <Segment raised color='orange'>
                    <Header textAlign='left'>Détails du compte</Header>
                    <Details fetchData={this.fetchData} data={this.state.data} />
                </Segment>
                <Segment raised color='orange'>
                    <Header textAlign='left'>Bilan du compte</Header>
                    <Bilan data={this.state.data} />
                </Segment>
            </Segment>
        );
    }
}

CompteEleve.propTypes = {
    match: PropTypes.object,
};

export default CompteEleve;
