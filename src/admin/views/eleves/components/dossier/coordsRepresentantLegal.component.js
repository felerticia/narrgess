// React
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// local
import DataEditor from '../dataEditor.component';

// data
import { representantLegal as coordsNeeded } from '../../../../../config/dossierCoords';

const CoordsRepresentantLegal = props => {
    const firebaseRef = `/eleves/${props.match.params.id}/dossier/representantLegal`;
    return (
        <Grid divided stackable columns={2}>
            <Grid.Column>
            {
                Object.keys(coordsNeeded).map((key, index) => (
                    index % 2 === 1 ? null :
                    <Grid.Row key={index}>
                        <DataEditor
                            key={index}
                            label={coordsNeeded[key].label}
                            type={coordsNeeded[key].type}
                            options={coordsNeeded[key].options}
                            data={props.data && Object.keys(props.data).find(dataKey => key === dataKey) ? props.data[key] : ""}
                            firebaseRef={`${firebaseRef}/${key}`}
                            fetchData={props.fetchData}
                        />
                        <br />
                    </Grid.Row>
                ))
            }
            </Grid.Column>
            <Grid.Column>
            {
                Object.keys(coordsNeeded).map((key, index) => (
                    index % 2 === 0 ? null :
                    <Grid.Row key={index}>
                        <DataEditor
                            key={index}
                            label={coordsNeeded[key].label}
                            type={coordsNeeded[key].type}
                            options={coordsNeeded[key].options}
                            data={props.data && Object.keys(props.data).find(dataKey => key === dataKey) ? props.data[key] : ""}
                            firebaseRef={`${firebaseRef}/${key}`}
                            fetchData={props.fetchData}
                        />
                        <br />
                    </Grid.Row>
                ))
            }
            </Grid.Column>
        </Grid>
    );
};

CoordsRepresentantLegal.propTypes = {
    data: PropTypes.object,
    match: PropTypes.object,
    fetchData: PropTypes.func,
};

export default withRouter(CoordsRepresentantLegal);