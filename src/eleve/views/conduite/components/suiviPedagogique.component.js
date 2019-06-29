// React
import React, { Component } from 'react';
import { Segment, Header, Divider, Button, Progress } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

// data
import suiviPedagogiqueData from '../../../../config/suiviPedagogique';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

class SuiviPedagogique extends Component {
    constructor(props) {
        super(props);

        this.getPercConduite = this.getPercConduite.bind(this);
        this.getPastHours = this.getPastHours.bind(this);
        this.getNbPastHours = this.getNbPastHours.bind(this);
        this.getLastHourDoneDate = this.getLastHourDoneDate.bind(this);
    }

    getPercConduite() {
        let points = 0;
        let maxPoints = 0;
        Object.keys(suiviPedagogiqueData).forEach(i1 => {
            const pedagogie = this.props.eleve.pedagogie ? this.props.eleve.pedagogie : {};
            const domaine = pedagogie[i1] ? pedagogie[i1] : {};
            Object.keys(suiviPedagogiqueData[i1]).forEach(i2 => {
                const competence = domaine[i2] ? domaine[i2] : {};
                const { level } = competence;
                points += level ? level : 0;
                maxPoints += 3;
            });
        });
        return parseInt(points/maxPoints*100, 10);
    }

    getPastHours() {
        const planning = this.props.eleve.planning ? this.props.eleve.planning : {};
        return _.orderBy(_.filter(planning, p => new Date(p.date) < new Date()), p => new Date(p.date).getTime(), ["desc"]);
    }

    getNbPastHours() {
        return this.getPastHours() ? this.getPastHours().length : 0;
    }

    getLastHourDoneDate() {
        const pastHours = this.getPastHours();
        if (pastHours && pastHours.length > 0) {
            const lastHourDate = new Date(pastHours[0].date);
            return `${addZero(lastHourDate.getDate())}/${addZero(lastHourDate.getMonth()+1)}/${lastHourDate.getFullYear()}`;
        }
        return "";
    }

    render() {
        return (
            <Segment raised loading={this.props.loading} color="orange">
                <Header dividing content="Suivi pédagogique" textAlign="center" />
                <Header as="h5" content="Conduite" textAlign="center" color="orange" />
                <Progress active progress percent={this.getPercConduite()} color="orange" />
                {
                    this.getPastHours() && this.getPastHours().length > 0 &&
                    <Header
                        as="h5"
                        color="orange"
                        textAlign="center"
                        content={`${this.getNbPastHours()}h de conduite réalisée(s)`}
                        subheader={`Dernière le ${this.getLastHourDoneDate()}`}
                    />
                }
                <Divider />
                <Button
                    fluid
                    color="orange"
                    icon="address book"
                    content="Mon livret prédagogique"
                    onClick={() => this.props.history.push('/eleve/conduite/pedagogie')}
                />
            </Segment>
        );
    }
}

SuiviPedagogique.propTypes = {
    history: PropTypes.object,
    eleve: PropTypes.object,
    loading: PropTypes.bool,
};

export default withRouter(SuiviPedagogique);