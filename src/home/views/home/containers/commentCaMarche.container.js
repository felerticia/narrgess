// React requirement
import React from 'react';
import { Grid, Header, Image, Divider } from 'semantic-ui-react';

// Style
import Style from '../styles/commentCaMArche.style';

const CommentCaMarche = () => (
    <div style={Style.container}>
        <Grid>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Header
                    as="h2" style={Style.header} color="orange"
                    content="Comment ça marche ?"
                    subheader="LA PREMIÈRE AUTO-ÉCOLE CONNECTÉE"
                />
                <Divider style={Style.divider} />
                <p style={Style.text}>Avec Conduite Center, bénéficiez de l'expertise d'une auto-école classique et du confort de l'auto-école en ligne : examens du code, réservation de vos heures de conduite... <b>Tout se fait en ligne avec l’aide de votre coach personnel !</b></p>
                <p style={Style.text}>En ligne et en quelques clics, votre inscription vous ouvre l'accès à votre espace et à toutes les écoles "Conduite Center". <b>Entrainez-vous sur mobile ou tablette, réservez vos heures de conduite en ligne et suivez votre progression avant de passer l’examen.</b></p>
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Image
                    fluid rounded centered
                    bordered={false} size="big"
                    src="/img/comment-ca-marche.png"
                />
            </Grid.Column>
        </Grid>
    </div>
);

CommentCaMarche.propTypes = {};

export default CommentCaMarche;
