// React
import React from 'react';
import { Segment, Grid, Image, Header, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// Style
import Style from '../styles/steps.style';

const Steps = props => (
    <Segment vertical attached inverted color="orange" textAlign="center" style={Style.segment}>
        <Grid verticalAlign="middle">
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Header
                    as="h2" textAlign="center" inverted
                    content="JE CHOISIS CE FORFAIT"
                    subheader="L’inscription est facile, sans engagement et 100% en ligne"
                />
                <br />
                <Grid centered>
                    <Grid.Column computer={1} tablet={1} mobile={0} />
                    <Grid.Column computer={4} tablet={4} mobile={16} textAlign="center">
                        <Image
                            centered rounded size="tiny" bordered={false}
                            src="/img/preInscription-step1.png"
                        />
                        <span><b>Remplissez</b><br />le formulaire d'inscription</span>
                    </Grid.Column>
                    <Grid.Column computer={1} tablet={1} mobile={0} />
                    <Grid.Column computer={4} tablet={4} mobile={16} textAlign="center">
                        <Image
                            centered rounded size="tiny" bordered={false}
                            src="/img/preInscription-step2.png"
                        />
                        <span><b>Téléchargez</b><br />vos pièces justificatives</span>
                    </Grid.Column>
                    <Grid.Column computer={1} tablet={1} mobile={0} />
                    <Grid.Column computer={4} tablet={4} mobile={16} textAlign="center">
                        <Image
                            centered rounded size="tiny" bordered={false}
                            src="/img/preInscription-step3.png"
                        />
                        <span><b>Profitez</b><br />des services ConduiteCenter</span>
                    </Grid.Column>
                    <Grid.Column computer={1} tablet={1} mobile={0} />
                </Grid>
                <br />
                <Button
                    secondary content="Je m'inscris" size="big"
                    onClick={() => props.history.push(`/signin?forfait=${props.forfait}`)}
                />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Image
                    centered size="medium" bordered={false}
                    src="/img/preInscription-background.png"
                />
            </Grid.Column>
        </Grid>
    </Segment>
);

Steps.propTypes = {
    history: PropTypes.object,
    forfait: PropTypes.string,
};

export default withRouter(Steps);