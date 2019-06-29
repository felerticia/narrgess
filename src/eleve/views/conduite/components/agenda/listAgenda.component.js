// React
import React, { Component } from 'react';
import { Divider, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import ProchaineHeure from './prochaineHeure.component';
import ProchainesHeures from './prochainesHeures.component';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getEleveNbHours } from '../../../../../actions/get.action';

class ListAgenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nbHeures: 0,
            loading: true,
        };

        this.getDisabledModifier = this.getDisabledModifier.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        const typeRDV = "-LCkVGoOWzkn9hwCjHGk";
        getEleveNbHours(uid, typeRDV).then(({ nbHeures }) => this.setState({ nbHeures, loading: false }))
    }
    
    getDisabledModifier() {
        const { eleve } = this.props;
        const planning = eleve.planning ? eleve.planning : {};
        const today = new Date();
        const in2days = today.setDate(today.getDate()+2);
        const planning48 = _.filter(planning, p => new Date(p.date) >= in2days);
        return !(planning48.length > 0);
    }

    render() {
        const planningEleve = this.props.eleve.planning ? this.props.eleve.planning : {};
        const planning = _.orderBy(_.filter(planningEleve, obj => new Date(obj.date) >= new Date()), obj => new Date(obj.date).getTime());
        return (
            <div>
                <ProchaineHeure
                    planning={planning}
                    lieuxRDV={this.props.lieuxRDV}
                    moniteurs={this.props.moniteurs}
                />
                <Divider />
                <ProchainesHeures
                    planning={planning}
                    lieuxRDV={this.props.lieuxRDV}
                    moniteurs={this.props.moniteurs}
                />
                <Divider fitted />
                <Message
                    icon="info circle"
                    color="orange"
                    content="Les heures de conduite peuvent être annulées jusqu'à 48h à l'avance. Passé ce délai, les heures réservées sont considérées comme dues."
                    size="mini"
                />
                <Message
                    icon="info circle"
                    color="orange"
                    content="Vous ne pouvez pas placer plus deux heures de conduite par jour."
                    size="mini"
                />
                <Button.Group fluid widths={8}>
                    <Button
                        inverted
                        disabled={this.getDisabledModifier()}
                        color="orange"
                        content="Modifier"
                        icon="edit"
                        onClick={this.props.toggleEdit}
                    />
                    <Button
                        inverted
                        loading={this.state.loading}
                        disabled={this.state.loading || this.state.nbHeures <= 0}
                        color="orange"
                        content="Réserver"
                        icon="clock"
                        onClick={() => this.props.history.push('/eleve/conduite/reserver')}
                    />
                </Button.Group>
            </div>
        );
    }
}

ListAgenda.propTypes = {
    eleve: PropTypes.object,
    moniteurs: PropTypes.object,
    lieuxRDV: PropTypes.object,
    typesRDV: PropTypes.object,
    history: PropTypes.object,
    toggleEdit: PropTypes.func,
};

export default withRouter(ListAgenda);