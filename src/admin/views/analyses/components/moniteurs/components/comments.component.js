// React
import React, { Component } from 'react';
import { Segment, Header, Grid, Comment } from 'semantic-ui-react';
import PropType from 'prop-types';

// actions
import { getEleves } from '../../../../../../actions/get.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.fetchData(nextProps.id);
        }
    }

    fetchData(id) {
        this.setState({ loading: true });
        getEleves().then(eleves => {
            const comments = [];
            Object.keys(eleves).forEach(eleveKey => {
                const eleve = eleves[eleveKey];
                const planning = eleve.planning ? eleve.planning : {};
                Object.keys(planning).forEach(planningKey => {
                    if ((planning[planningKey].comment || planning[planningKey].rating) && planning[planningKey].moniteur === id) {
                        comments.push({
                            eleve: `${eleve.dossier.eleve.nom} ${eleve.dossier.eleve.prenom}`,
                            date: `${addZero(new Date(planning[planningKey].date).getDate())}/${addZero(new Date(planning[planningKey].date).getMonth()+1)}/${new Date(planning[planningKey].date).getFullYear()}`,
                            content: planning[planningKey].comment,
                            rating: planning[planningKey].rating,
                        });
                    }
                });
            });
            this.setState({ comments, loading: false });
        });
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Header dividing color="orange" content="Commentaires des élèves" />
                <Grid>
                {
                    this.state.comments.map((comment, key) => (
                        <Grid.Column computer={4} tablet={8} mobile={16} key={key}>
                            <Comment>
                                <Comment.Content>
                                    <Comment.Author><b>{comment.eleve}</b></Comment.Author>
                                    <Comment.Metadata>Le {comment.date}</Comment.Metadata>
                                    <Comment.Text>
                                        {comment.content}{" "}
                                        <b>Note :</b> {comment.rating}/5
                                    </Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Grid.Column>
                    ))
                }
                </Grid>
            </Segment>
        );
    }
};

Comments.propTypes = {
    id: PropType.string,
}

export default Comments;