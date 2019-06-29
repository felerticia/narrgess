// React
import React, { Component } from 'react';
import { Segment, Header, Icon, Label, Dimmer } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import ListAgenda from '../components/agenda/listAgenda.component';
import EditAgenda from '../components/agenda/editAgenda.component';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getMoniteurs, getLieuRDV, getTypesRDV, getExamens, getElevePastExamens } from '../../../../actions/get.action';

class Agenda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moniteurs: {},
            lieuxRDV: {},
            typesRDV: {},
            examens: {},
            pastExams: {},
            dimmed: false,
            loading: true,
            edit: false,
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.getDimmedCode = this.getDimmedCode.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getMoniteurs().then(moniteurs => {
            getLieuRDV().then(lieuxRDV => {
                getTypesRDV().then(typesRDV => {
                    getExamens().then(examens => {
                        getElevePastExamens(uid).then(pastExams => {
                            this.setState({ examens, moniteurs, lieuxRDV, typesRDV, pastExams, loading: false });
                        });
                    });
                });
            });
        });
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit });
    }

    getDimmedCode() {
        const { examens, pastExams } = this.state;
        const { uid } = getLoggedUser();
        let dimmed = true;
        Object.values(examens).forEach(examen => {
            const eleves = examens.eleves ? examens.eleves : {};
            const resultEleve = Object.values(eleves).find(e => e.eleve === uid);
            if (resultEleve && resultEleve.result === "Obtenu" && examen.type === "Code") dimmed = false;
        });
        Object.values(pastExams).forEach(examen => {
            if (examen.resultat === "Obtenu" && examen.type === "Code") dimmed = false;
        });
        return dimmed;
    }

    render() {
        const planning = this.props.eleve.planning ? this.props.eleve.planning : {};
        const pastHours = _.orderBy(_.filter(planning, p => new Date(p.date) < new Date()), p => new Date(p.date).getTime(), ["desc"]);
        const dimmedMoniteur = pastHours.length > 0 ? !Object.keys(pastHours[0]).find(e => e === "rating") : false;
        const dimmedCode = this.getDimmedCode();
        const dimmed = dimmedMoniteur || dimmedCode;
        return (
            <Dimmer.Dimmable blurring as="div" dimmed={dimmed}>
                <Segment raised loading={this.state.loading || this.props.loading} color="orange">
                    {
                        this.state.edit &&
                        <Label
                            as='a'
                            icon='arrow left'
                            attached='top left'
                            onClick={this.toggleEdit}
                        />
                    }
                    <Header content="Agenda" textAlign="center" />
                    {
                        this.state.edit ?
                        <EditAgenda
                            eleve={this.props.eleve}
                            moniteurs={this.state.moniteurs}
                            lieuxRDV={this.state.lieuxRDV}
                            toggleEdit={this.toggleEdit}
                            fetchData={this.props.fetchData}
                        /> :
                        <ListAgenda
                            eleve={this.props.eleve}
                            moniteurs={this.state.moniteurs}
                            lieuxRDV={this.state.lieuxRDV}
                            typesRDV={this.state.typesRDV}
                            toggleEdit={this.toggleEdit}
                        />
                    }
                </Segment>
                <Dimmer active={dimmed}>
                    <Segment color="orange">
                        <Header as='h2' icon textAlign='center'>
                            <Icon name="warning sign" />
                            <Header.Content>
                                { dimmedMoniteur ? "Pour afficher et modifier votre planning, il faut tout d'abord noter votre dernier moniteur" : "" }
                                { dimmedCode ? "Pour afficher et modifier votre planning, il faut tout d'abord obtenir votre code" : "" }
                            </Header.Content>
                        </Header>
                    </Segment>
                </Dimmer>
            </Dimmer.Dimmable>
        );
    }
}

Agenda.propTypes = {
    eleve: PropTypes.object,
    loading: PropTypes.bool,
    fetchData: PropTypes.func,
};

export default Agenda;