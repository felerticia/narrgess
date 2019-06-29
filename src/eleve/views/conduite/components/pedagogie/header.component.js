// React
import React from 'react';
import { Segment, Grid, Button, Responsive, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getPDFLivretPedagogique } from '../../../../../actions/get.action';
import { convert2pdf } from '../../../../../actions/convert.action';

const handleDownload = () => {
    const { uid } = getLoggedUser();
    getPDFLivretPedagogique(uid).then(data => {
        const { html } = data;
        convert2pdf(html, `livretPedagogique.pdf`);
    });
};

const Header = props => (
    <Segment>
        <Grid>
            <Grid.Row verticalAlign="middle">
                <Grid.Column mobile={8} tablet={4} computer={4}>
                    <Responsive
                        as={() => <Button fluid icon="arrow left" content="Retour" onClick={() => props.history.push('/eleve/conduite')} />}
                        minWidth={1024}
                    />
                    <Responsive
                        as={() => <Button fluid icon="arrow left" onClick={() => props.history.push('/eleve/conduite')} />}
                        maxWidth={1023}
                    />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                    <Responsive
                        as={() => <Button primary fluid icon="download" content="Télécharger" onClick={() => handleDownload()} />}
                        minWidth={1024}
                    />
                    <Responsive
                        as={() => <Button primary circulat fluid icon="download" onClick={() => handleDownload()} />}
                        maxWidth={1023}
                    />
                </Grid.Column>
                <Responsive
                    as={() => (
                        <Grid.Column width={2} textAlign="center">
                            <Icon name="eye" color="orange" />
                            <i>Abordée</i>{"\t"}
                        </Grid.Column>
                    )}
                    minWidth={1024}
                />
                <Responsive
                    as={() => (
                        <Grid.Column width={2} textAlign="center">
                            <Icon name="thumbs up" color="orange" />
                            <i>Traitée</i>{"\t"}
                        </Grid.Column>
                    )}
                    minWidth={1024}
                />
                <Responsive
                    as={() => (
                        <Grid.Column width={2} textAlign="center">
                            <Icon name="check circle" color="orange" />
                            <i>Assimilée</i>{"\t"}
                        </Grid.Column>
                    )}
                    minWidth={1024}
                />
                <Responsive
                    as={() => (
                        <Grid.Column width={2} textAlign="center">
                            <Icon name="comment" color="orange" />
                            <i>Commentaire</i>{"\t"}
                        </Grid.Column>
                    )}
                    minWidth={1024}
                />
            </Grid.Row>
        </Grid>
    </Segment>
);

Header.propTypes = {
    history: PropTypes.object,
}

export default withRouter(Header);