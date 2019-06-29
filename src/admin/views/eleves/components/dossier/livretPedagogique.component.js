// React
import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getPDFLivretPedagogique } from '../../../../../actions/get.action';
import { convert2pdf } from '../../../../../actions/convert.action';

const handleDownload = id => {
    getPDFLivretPedagogique(id).then(data => {
        const { html } = data;
        convert2pdf(html, `LivretPedagogique.pdf`);
    });
};

const LivretPedagogique = props => (
    <Button
        primary fluid
        icon="download"
        content="Télécharger le livret pédagogique"
        onClick={() => handleDownload(props.match.params.id)}
    />
);

LivretPedagogique.propTypes = {
    match: PropTypes.object,
};

export default withRouter(LivretPedagogique);