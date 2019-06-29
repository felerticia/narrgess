// React
import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

// Local
import FileUpload from '../components/fileUpload.component';

const Pieces = () => (
    <Segment raised color="orange">
        <Header as="h2" content="Pièces à fournir" textAlign="center" />
        <FileUpload
            label="Pièce d'identité Recto/Verso"
            pieceRef="identite"
        />
        <FileUpload
            label="Certificat individuel de participation à la JDC ou attestation de recensement pour les - de 18 ans"
            pieceRef="jdc"
        />
        <FileUpload
            label="Justificatif de domicile de moins de 3 mois"
            pieceRef="domicile"
        />
        <FileUpload
            label="Pièce d'identité d'un tuteur si l'élève est mineur"
            pieceRef="tuteur"
        />
        <FileUpload
            label="Photo d'identité aux normes"
            pieceRef="photo"
        />
    </Segment>
);

export default Pieces;