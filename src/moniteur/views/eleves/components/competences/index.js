// React
import React from 'react';
import { Segment } from 'semantic-ui-react';

// Local
import Competence from './components/competence.component';

// data
import suiviPedagogiqueData from '../../../../../config/suiviPedagogique.json'

const Competences = () => (
    <Segment color="orange">
        {
            Object.keys(suiviPedagogiqueData).map((competence, index) => (
                <div>
                    { index !== 0 && <br />}
                    <Competence
                        key={competence}
                        competence={competence}
                        titles={suiviPedagogiqueData[competence]}
                    />
                </div>
            ))
        }
    </Segment>
);

export default Competences;