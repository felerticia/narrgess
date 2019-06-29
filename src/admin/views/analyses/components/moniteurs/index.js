// React
import React, { Component } from 'react';
import { Segment, Grid, Image, Statistic, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropType from 'prop-types';

// Local
import Production from './components/production.component';
import Reussite from './components/reussite.component';
import Comments from './components/comments.component';

// actions
import { getMoniteur } from '../../../../../actions/get.action';
import { getDownloadURL } from '../../../../../actions/storage.action';

class Moniteur extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            avatarUrl: "",
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.fetchData(nextProps.match.params.id);
        }
    }

    fetchData(id) {
        if (id) {
            this.setState({ loading: true });
            getMoniteur(id).then(data => {
                getDownloadURL('/moniteurs/avatar.jpg').then(avatarUrl => {
                    this.setState({
                        data,
                        avatarUrl,
                        loading: false,
                    });
                });
            });
        }
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
            {
                this.props.match.params.id &&
                <div>
                    <Grid divided columns={2}>
                        <Grid.Row>
                            <Grid.Column style={{ display: "flex", justifyContent: "center", alignItems: "center" }} width={4}>
                                <Image circular size="small" src={this.state.data.imageUrl ? this.state.data.imageUrl : this.state.avatarUrl} />
                            </Grid.Column>
                            <Grid.Column textAlign="center" verticalAlign="middle" width={12}>
                                <Header as="h2" content={`${this.state.data.nom} ${this.state.data.prenom}`} />
                                <Statistic label="Note" value={this.state.data.rating ? `${parseInt(this.state.data.rating*100, 10)/100}/5` : "N.A."} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                    <Production id={this.props.match.params.id} />
                    <Reussite id={this.props.match.params.id} />
                    <Comments id={this.props.match.params.id} />
                </div>
            }
            </Segment>
        );
    }
};

Moniteur.propTypes = {
    match: PropType.object,
}

export default withRouter(Moniteur);