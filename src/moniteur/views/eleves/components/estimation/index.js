// React
import React, { Component } from 'react';
import { Segment, Header, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getEleveEstimations } from '../../../../../actions/get.action';
import { addEleveEstimation } from '../../../../../actions/add.action';
import { editEleveEstimation } from '../../../../../actions/edit.action';
import { deleteEleveEstimation } from '../../../../../actions/delete.action';

class Estimation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            estimationKey: "",
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChangeEstimation = this.handleChangeEstimation.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { uid } = getLoggedUser();
        this.setState({ loading: true });
        getEleveEstimations(this.props.match.params.id).then(estimations => {
            const estimationKey = Object.keys(estimations).find(key => estimations[key].moniteur === uid);
            if (estimationKey) {
                this.setState({
                    estimationKey,
                    value: estimations[estimationKey].value,
                    loading: false
                });
            } else this.setState({ value: 0, loading: false });
        });        
    }

    handleChangeEstimation(_, { value }) {
        const val = value ? parseInt(value, 10) : 0;
        if (this.state.estimationKey) {
            if (val === 0) deleteEleveEstimation(this.props.match.params.id, this.state.estimationKey).then(() => this.fetchData());
            else {
                editEleveEstimation(this.props.match.params.id, this.state.estimationKey, {
                    value: val,
                    moniteur: getLoggedUser().uid,
                    viewed: false,
                }).then(() => this.fetchData());
            }
        } else {
            addEleveEstimation(this.props.match.params.id, {
                value: val,
                moniteur: getLoggedUser().uid,
                viewed: false,
            }).then(() => this.fetchData());
        }
    }

    render() {
        return (
            <Segment color="orange" loading={this.state.loading}>
                <Header content="Donner une estimation d'heures" textAlign="center" />
                <Segment basic>
                    <Header as="h4" icon="warning sign" content="Attention, il faut donner une estimation sur le nombre d'heures complémentaires" />
                    Vous pensez que cet élève doit effectuer{" "}
                    <Input
                        type="number" min="0"
                        value={this.state.value}
                        onChange={this.handleChangeEstimation}
                    />{" "}
                    heures complémentaires
                </Segment>
            </Segment>
        );
    }
}

Estimation.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};

export default Estimation