// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

// Local
import DataEditor from '../components/dataEditor.component';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getEleveDossier } from '../../../../actions/get.action';

// data
import { eleve as coordsNeeded } from '../../../../config/dossierCoords'

class CoordEleve extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
        };
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getEleveDossier(uid).then(dossier => {
            const data = dossier.eleve ? dossier.eleve : {};
            this.setState({ data, loading: false });
        });
    }

    render() {
        const { uid } = getLoggedUser();
        return (
            <Segment raised color="orange" loading={this.state.loading}>
                <Header as="h2" content="Mes coordonnées" textAlign="center" />
                <br />
                {
                    Object.keys(coordsNeeded).map((key, index) => (
                        <DataEditor
                            key={index}
                            type={coordsNeeded[key].type}
                            label={coordsNeeded[key].label}
                            value={this.state.data && Object.keys(this.state.data).find(dataKey => key === dataKey) ? this.state.data[key] : ""}
                            options={coordsNeeded[key].options}
                            firebaseRef={`/eleves/${uid}/dossier/eleve/${key}`}
                        />
                    ))
                }
                <br />
            </Segment>
        );
    }
}

export default CoordEleve;