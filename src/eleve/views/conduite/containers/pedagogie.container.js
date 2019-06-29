// React
import React from 'react';
import { Segment } from 'semantic-ui-react';

// Local
import Header from '../components/pedagogie/header.component';
import Competence from '../components/pedagogie/competence.component';

// data
import suiviPedagogiqueData from '../../../../config/suiviPedagogique.json';

const Pedagogie = () => (
    <Segment basic>
        <Header />
        <br />
        {
            Object.keys(suiviPedagogiqueData).map((competence, index) => (
                <div>
                    { index !== 0 && <br /> }
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

export default Pedagogie;
