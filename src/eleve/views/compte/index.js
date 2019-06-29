// React
import React from 'react';
import { Container, Segment, Header, Grid, Message } from 'semantic-ui-react';

// Local
import Details from './containers/details.container';
import Contrats from './containers/contrats.container';
import Factures from './containers/factures.container';

const getResponseCode = search => search.substring(search.length - 2);

const getMessageHeader = search => {
    const responseCode = getResponseCode(search);
    return responseCode !== "00" ? "Erreur" : "Succès";
};

const getMessageContent = search => {
    const responseCode = getResponseCode(search);
    if (responseCode === "00") return "Votre transaction a été réalisée avec succès !";
    else if (responseCode === "17") return "Votre transaction a été annulée.";
    else if (responseCode === "05" || responseCode === "34") return "Votre paiement a été refusé.";
    else if (responseCode === "75") return "Nombre maximum d'essais atteint.";
    else if (parseInt(responseCode, 10) >= 90 && parseInt(responseCode, 10) <= 99) return "Refus suite à un problème technique.";
};

const Compte = props => (
    <div>
        <Segment inverted fluid padded attached color="orange">
            <Header
                as="h2"
                icon="credit card outline"
                content="Mon compte"
                subheader="Mes contrats et mes achats"
            />
        </Segment>
        <br />
        <Container>
            <Segment basic>
                <Message
                    hidden={props.location.search.length === 0}
                    error={getResponseCode(props.location.search) !== "00"}
                    positive={getResponseCode(props.location.search) === "00"}
                    header={getMessageHeader(props.location.search)}
                    content={getMessageContent(props.location.search)}
                />
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Details />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column computer={8} tablet={16}>
                            <Contrats />
                            <br />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16}>
                            <Factures />
                            <br />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    </div>
);

export default Compte;