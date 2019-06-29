import React from 'react';

const PopupContent = () => (
    <div>
        <p>
            <b>0 - Chargé</b><br /><br />
            <span>Onglets disponibles :</span>
            <ul>
                <li>Planning</li>
                <li>Eleve</li>
                <li>Examen</li>
            </ul>
            <span>Informations supplémentaires :</span>
            <ul>
                <li>Ne peut pas supprimer des heures passées</li>
                <li>Ne peut pas indiquer le nombre d'heures passées</li>
                <li>Ne peut pas rajouter une absence excusées</li>
                <li>Ne peut pas supprimer des encaissements</li>
                <li>Ne peut pas supprimer des ventes</li>
                <li>Ne peut pas rajouter un remboursement ou un impayé</li>
            </ul>
        </p>
        <hr />
        <p>
            <b>1 - Comptable</b><br /><br />
            <span>Onglets disponibles :</span>
            <ul>
                <li>Planning</li>
                <li>Eleve</li>
                <li>Examen</li>
                <li>Analyses</li>
                <li>Comptabilité</li>
            </ul>
            <span>Informations supplémentaires :</span>
            <ul>
                <li>Ne peut pas supprimer des heures passées</li>
                <li>Ne peut pas rajouter une absence excusées</li>
                <li>Peut rajouter des heures passées</li>
                <li>Peut supprimer des encaissements</li>
                <li>Peut supprimer des ventes</li>
                <li>Peut rajouter un remboursement ou un impayé</li>
            </ul>
        </p>
    </div>
);

export default PopupContent;