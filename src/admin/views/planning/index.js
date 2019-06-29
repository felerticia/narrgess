// React
import React, { Component } from 'react';
import { Segment, Menu, Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Local
import Placer from './containers/placer.container';
import Eleve from './containers/eleve.container';
import Calendrier from './containers/calendrier.container';
import PastHours from './containers/pastHours.container';

// actions
import { getUserLevel } from '../../../actions/get.action';
import { getLoggedUser } from '../../../actions/auth.action';

class Planning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userLevel: 0,
            eleve: "",
            loading: true,
        }
    }

    UNSAFE_componentWillMount() {
        getUserLevel(getLoggedUser().uid)
        .then(userLevel => this.setState({ userLevel, loading: false }))
        .catch(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <Container fluid>
                <Segment fluid="true" padded>
                    <Menu pointing fluid>
                        {
                            this.state.userLevel >= 0 &&
                            <Menu.Item
                                name='Placer des heures'
                                active={this.props.location.pathname.split('/')[3] === 'placer'}
                                onClick={() => this.props.history.push('/admin/planning/placer')}
                            />
                        }
                        {
                            (this.state.userLevel >= 0 && this.state.eleve !== "") &&
                            <Menu.Item
                                name='Eleve'
                                active={this.props.location.pathname.split('/')[3] === 'eleve'}
                                onClick={() => this.props.history.push(`/admin/planning/eleve/${this.state.eleve}`)}
                            />
                        }
                        {
                            this.state.userLevel >= 0 &&
                            <Menu.Item
                                name='Calendrier'
                                active={this.props.location.pathname.split('/')[3] === 'calendrier'}
                                onClick={() => this.props.history.push('/admin/planning/calendrier')}
                            />
                        }
                        {
                            this.state.userLevel >= 1 &&
                            <Menu.Item
                                name='Heures passées'
                                active={this.props.location.pathname.split('/')[3] === 'pastHours'}
                                onClick={() => this.props.history.push(`/admin/planning/pastHours`)}
                            />
                        }
                    </Menu>
                    <Switch>
                        {
                            this.state.userLevel >= 0 &&
                            <Route path='/admin/planning/placer' render={props => (
                                <Placer
                                    {...props}
                                    eleve={this.state.eleve}
                                    handleChangeEleve={eleve => this.setState({ eleve })}
                                />
                            )} />
                        }
                        {
                            (this.state.userLevel >= 0 && this.state.eleve !== "") &&
                            <Route path='/admin/planning/eleve/:id' render={props => (
                                <Eleve
                                    {...props}
                                    eleve={this.state.eleve}
                                />
                            )} />
                        }
                        {
                            this.state.userLevel >= 0 &&
                            <Route path='/admin/planning/calendrier' component={Calendrier} />
                        }
                        {
                            this.state.userLevel >= 1 &&
                            <Route path='/admin/planning/pastHours' component={PastHours} />
                        }
                        <Redirect to='/admin/planning/placer' />
                    </Switch>
                </Segment>
                <br /><br />
            </Container>
        );
    }
}

Planning.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
};

export default Planning;
