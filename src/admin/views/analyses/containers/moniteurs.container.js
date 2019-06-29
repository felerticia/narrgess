// React
import React, { Component } from 'react';
import { Segment, Header, Dropdown, Label } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// Local
import Moniteur from '../components/moniteurs/';

// actions
import { getMoniteurs } from '../../../../actions/get.action';

class Moniteurs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            moniteurs: [],
            loading: true,
        };
    }

    UNSAFE_componentWillMount() {
        getMoniteurs().then(moniteurs => this.setState({ moniteurs, loading: false }));
    }

    render() {
        return (
            <Segment raised padded loading={this.state.loading}>
                <Label
                    as='a'
                    size='large'
                    icon='arrow left'
                    attached='top left'
                    onClick={() => this.props.history.push('/admin/analyses')}
                />
                <Header as='h2' textAlign='center'>Moniteurs</Header>
                <Dropdown
                    fluid search selection
                    value={this.props.location.pathname.split("/")[4]}
                    placeholder="Veuillez choisir un moniteur ..."
                    options={Object.keys(this.state.moniteurs).map(key => ({
                        key,
                        value: key,
                        text: `${this.state.moniteurs[key].nom} ${this.state.moniteurs[key].prenom}`,
                    }))}
                    onChange={(_, { value }) => this.props.history.push(`/admin/analyses/moniteurs/${value}`)}
                />
                <Switch>
                    <Route path='/admin/analyses/moniteurs/:id' component={Moniteur} />
                </Switch>
            </Segment>
        );
    }
};

Moniteurs.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
};

export default withRouter(Moniteurs);
