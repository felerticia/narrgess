// React
import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const List = props => (
    <div>
        {
            props.userLevel >= 0 &&
            <Button
                fluid positive
                size='big'
                icon='shop'
                content='Ajouter une vente'
                onClick={() => props.handleChangeView('ventes')}
            />
        }
        { props.userLevel >= 0 && <br /> }
        {
            props.userLevel >= 0 &&
            <Button
                fluid positive
                size='big'
                icon='payment'
                content='Ajouter un encaissement'
                onClick={() => props.handleChangeView('encaissements')}
            />
        }
        { props.userLevel >= 1 && <br /> }
        {
            props.userLevel >= 1 &&
            <Button
                fluid positive
                size='big'
                icon='wait'
                content='Ajouter un impayé'
                onClick={() => props.handleChangeView('impayes')}
            />
        }
        { props.userLevel >= 1 && <br /> }
        {
            props.userLevel >= 1 &&
            <Button
                fluid positive
                size='big'
                icon='redo'
                content='Ajouter un remboursement'
                onClick={() => props.handleChangeView('remboursements')}
            />
        }
    </div>
);

List.propTypes = {
    handleChangeView: PropTypes.func,
    userLevel: PropTypes.number,
};

export default List;