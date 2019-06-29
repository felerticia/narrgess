// React
import React, { Component } from 'react';
import { Segment, Header, Message, Grid, Button, Image, Divider, Rating, Form, TextArea } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getMoniteur, getEleves } from '../../../../actions/get.action';
import { editElevePlanningElement, editMoniteur } from '../../../../actions/edit.action';
import { getDownloadURL } from '../../../../actions/storage.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class EvaluationMoniteur extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pastHour: {},
            moniteur: {},
            avatarUrl: "",
            rating: 0,
            comment: "",
            loading: true,
            loadingButton: false,
        };

        this.handleSubmitRating = this.handleSubmitRating.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.eleve);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps.eleve);
    }

    fetchData(eleve) {
        this.setState({ loading: true });
        const planning = eleve.planning ? eleve.planning : {};
        Object.keys(planning).forEach(key => planning[key].key = key);
        const pastHours = _.orderBy(_.filter(planning, p => new Date(p.date) < new Date()), p => new Date(p.date).getTime(), ["desc"]);
        if (pastHours && pastHours.length > 0) {
            const pastHour = pastHours[0];
            if (pastHour.moniteur) {
                getMoniteur(pastHour.moniteur).then(moniteur => {
                    getDownloadURL("/moniteurs/avatar.jpg").then(avatarUrl => {
                        this.setState({
                            pastHour, moniteur, avatarUrl,
                            rating: pastHour.rating ? pastHour.rating : 0,
                            comment: pastHour.comment ? pastHour.comment : "",
                            loading: false,
                        });
                    });
                });
            } else this.setState({ loading: false });
        } else this.setState({ loading: false });
    }

    handleSubmitRating(rating) {
        this.setState({ rating, loading: true })
        const { uid } = getLoggedUser();
        editElevePlanningElement(uid, this.state.pastHour.key, { rating }).then(() => {
            this.props.fetchData();
            getEleves().then(eleves => {
                let notes = 0; let counter = 0;
                Object.values(eleves).forEach(eleve => {
                    const planning = eleve.planning ? eleve.planning : {};
                    Object.values(planning).forEach(p => {
                        if (p.rating && p.moniteur === this.state.pastHour.moniteur) {
                            notes += p.rating;
                            counter += 1;
                        }
                    });
                });
                editMoniteur(this.state.pastHour.moniteur, { rating: notes/counter });
            });
        });
    }

    handleSubmitComment() {
        const { uid } = getLoggedUser();
        this.setState({ loadingButton: true });
        editElevePlanningElement(uid, this.state.pastHour.key, { comment: this.state.comment ? this.state.comment : null }).then(() => {
            this.setState({ loadingButton: false });
            this.props.fetchData();
        });
    }

    render() {
        return (
            <Segment raised loading={this.state.loading || this.props.loading} color="orange">
                <Header dividing content="Évaluation moniteur" textAlign="center" />
                {
                    !this.state.pastHour || Object.values(this.state.pastHour).length === 0 ?
                    <Message info content="Vous n'avez pas encore réalisé une heure de conduite" /> :
                    <div>
                        <Grid divided columns={2}>
                            <Grid.Row>
                                <Grid.Column style={{ display: "flex", flex: "1", alignItems: "center", justifyContent: "center" }} verticalAlign="middle" computer={8} tablet={6} mobile={16}>
                                    <Image
                                        circular
                                        size="small"
                                        src={this.state.moniteur.imageUrl ? this.state.moniteur.imageUrl : this.state.avatarUrl}
                                    />
                                    <br />
                                </Grid.Column>
                                <Grid.Column textAlign="center" verticalAlign="middle" computer={8} tablet={10} mobile={16}>
                                    <Header
                                        as="h5"
                                        color="grey"
                                        textAlign="center"
                                        content="Vous étiez avec ..."
                                    />
                                    <Header
                                        as="h4"
                                        color="orange"
                                        textAlign="center"
                                        content={`${this.state.moniteur.nom} ${this.state.moniteur.prenom}`}
                                        subheader={`Le ${addZero(new Date(this.state.pastHour.date).getDate())}/${addZero(new Date(this.state.pastHour.date).getMonth()+1)}/${new Date(this.state.pastHour.date).getFullYear()}`}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Divider />
                        <Header textAlign="center" color="grey">
                            Note :{" "}
                            <Rating
                                maxRating={5}
                                icon="star" size="huge"
                                onRate={(_, { rating }) => this.handleSubmitRating(rating)}
                                rating={this.state.rating ? this.state.rating : 0}
                            />
                        </Header>
                        <Divider />
                        <Form>
                            <TextArea
                                autoHeight
                                placeholder="Commentaire ..."
                                value={this.state.comment}
                                onChange={(_, { value }) => this.setState({ comment: value })}
                            />
                        </Form>
                        <br />
                        <Button
                            fluid
                            color="orange"
                            icon="save"
                            content="Enregistrer"
                            loading={this.state.loadingButton}
                            onClick={this.handleSubmitComment}
                        />
                    </div>
                }
            </Segment>
        );
    }
}

EvaluationMoniteur.propTypes = {
    history: PropTypes.object,
    eleve: PropTypes.object,
    loading: PropTypes.bool,
    fetchData: PropTypes.func,
};

export default withRouter(EvaluationMoniteur);