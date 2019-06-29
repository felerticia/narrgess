// React
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import List from './addComponents/list.component';
import Ventes from './addComponents/ventes.component';
import Encaissements from './addComponents/encaissements.component';
import Impayes from './addComponents/impayes.component';
import Remboursements from './addComponents/remboursements.component';

// actions
import { getBoutiques, getUserLevel } from '../../../../../actions/get.action';
import { getLoggedUser } from '../../../../../actions/auth.action';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'list',
            userLevel: 0,
            loadingUserLevel: true,
            boutique: {},
            loadingBoutique: true,
        };

        this.handleChangeView = this.handleChangeView.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getBoutiques().then(boutique => this.setState({ boutique, loadingBoutique: false }));
        getUserLevel(uid).then(userLevel => this.setState({ userLevel, loadingUserLevel: false }));
    }

    handleChangeView(view) {
        this.setState({ view });
    }

    render() {
        return (
            <Segment basic loading={this.state.loadingBoutique || this.state.loadingUserLevel}>
            {
                this.state.userLevel >= 0 && this.state.view === 'list' ? <List handleChangeView={this.handleChangeView} userLevel={this.state.userLevel} /> :
                this.state.userLevel >= 0 && this.state.view === 'ventes' ? <Ventes handleChangeView={this.handleChangeView} fetchData={this.props.fetchData} boutique={this.state.boutique} userLevel={this.state.userLevel} /> :
                this.state.userLevel >= 0 && this.state.view === 'encaissements' ? <Encaissements handleChangeView={this.handleChangeView} fetchData={this.props.fetchData} userLevel={this.state.userLevel} /> :
                this.state.userLevel >= 1 && this.state.view === 'impayes' ? <Impayes handleChangeView={this.handleChangeView} fetchData={this.props.fetchData} userLevel={this.state.userLevel} /> :
                this.state.userLevel >= 1 && this.state.view === 'remboursements' ? <Remboursements handleChangeView={this.handleChangeView} fetchData={this.props.fetchData} userLevel={this.state.userLevel} /> :
                ''
            }
            </Segment>
        );
    }
}

Add.propTypes = {
    fetchData: PropTypes.func,
};

export default Add;