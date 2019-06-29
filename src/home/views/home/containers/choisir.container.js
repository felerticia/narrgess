// React requirement
import React from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import YouTube from 'react-youtube';

// Style
import Style from '../styles/choisir.style';

const Choisir = () => (
    <div style={Style.container}>
        <Grid>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <Header
                    as="h2" style={Style.header} color="orange"
                    content="Pourquoi nous choisir ?"
                    subheader="LES GARANTIES CONDUITE CENTER"
                />
                <YouTube videoId="OvLgKs-_GLg" id="OvLgKs-_GLg" />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
                <p style={Style.text}>Conduite Center s'attache à faire de l'apprentissage de la conduite un plaisir. Nous accompagnons tous nos élèves du début à la fin de leur formation. <b>Leur bien-être et leur réussite à l'examen de la conduite sont nos priorités absolues.</b></p>
                <List relaxed="very">
                    <List.Item>
                        <List.Icon name="stopwatch" size="big" color="orange" verticalAlign="middle" />
                        <List.Content style={Style.listContent}>
                            <List.Header style={Style.listHeader}>Délais courts</List.Header>
                            <List.Description style={Style.textOrange}>La garantie d’être présenté au plus vite à l’examen du code et du permis.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="star" size="big" color="orange" verticalAlign="middle" />
                        <List.Content style={Style.listContent}>
                            <List.Header style={Style.listHeader}>Prix juste</List.Header>
                            <List.Description style={Style.textOrange}>Des forfaits adaptés à tous les budgets et tous les besoins.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="certificate" size="big" color="orange" verticalAlign="middle" />
                        <List.Content style={Style.listContent}>
                            <List.Header style={Style.listHeader}>Moniteurs certifiés</List.Header>
                            <List.Description style={Style.textOrange}>animés par l’envie de voir leurs élèves réussir.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="user circle" size="big" color="orange" verticalAlign="middle" />
                        <List.Content style={Style.listContent}>
                            <List.Header style={Style.listHeader}>Coach personnel</List.Header>
                            <List.Description style={Style.textOrange}>pour préparer au mieux le code et l’examen du permis de conduire.</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
        </Grid>
    </div>
);

Choisir.propTypes = {};

export default Choisir;
