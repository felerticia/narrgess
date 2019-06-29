// React
import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import FileDownload from './fileDownload.component';

const refs = [
    { label: "Pièce d'identité Recto/Verso", ref: "identite" },
    { label: "Certificat individuel de participation à la JDC ou attestation de recensement pour les - de 18 ans", ref: "jdc" },
    { label: "Justificatif de domicile de moins de 3 mois", ref: "domicile" },
    { label: "Pièce d'identité d'un tuteur si l'élève est mineur", ref: "tuteur" },
    { label: "Photo d'identité aux normes", ref: "photo" },
]

const Pieces = props => (
    <Segment basic>
    {
        refs.map((ref, key) => (
            <FileDownload
                key={key}
                label={ref.label}
                pieceRef={ref.ref}
                data={props.data ? props.data[ref.ref] ? props.data[ref.ref] : {} : {}}
            />
        ))
    }
    </Segment>
);

Pieces.propTypes = {
    data: PropTypes.object,
};

export default Pieces;