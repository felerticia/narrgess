// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import CoordsEleve from '../../components/dossier/coordsEleve.component';
import CoordsRepresentantLegal from '../../components/dossier/coordsRepresentantLegal.component';
import LivretPedagogique from '../../components/dossier/livretPedagogique.component';
import Pieces from '../../components/dossier/pieces.component';

// actions
import { getUserEmail, getEleveDossier } from '../../../../../actions/get.action';

class DossierEleve extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { id } = this.props.match.params;
        getEleveDossier(id).then(data => {
            getUserEmail(id).then(email => {
                data.eleve.email = email;
                this.setState({ data, loading: false });
            });
        });
    }

    render() {
        return (
            <Segment padded loading={this.state.loading}>
                <Header
                    as='h2'
                    textAlign='center'
                    content='Dossier élève'
                />
                <Segment raised color='orange'>
                    <Header textAlign='left'>Coordonnées de l&#39;élève</Header>
                    <CoordsEleve
                        data={this.state.data.eleve}
                        fetchData={this.fetchData}
                    />
                </Segment>
                <Segment raised color='orange'>
                    <Header textAlign='left'>Coordonnées du représentant légal</Header>
                    <CoordsRepresentantLegal
                        data={this.state.data.representantLegal}
                        fetchData={this.fetchData}
                    />
                </Segment>
                <Segment raised color='orange'>
                    <Header textAlign='left'>Livret pédagogique</Header>
                    <LivretPedagogique />
                </Segment>
                <Segment raised color='orange'>
                    <Header textAlign='left'>Fichiers relatifs à l&#39;élève</Header>
                    <Pieces data={this.state.data.pieces} />
                </Segment>
            </Segment>
        );
    }
}

DossierEleve.propTypes = {
    match: PropTypes.object,
};

export default DossierEleve;
