// React
import React, { Component } from 'react';
import { Segment, Button, Header, Icon, Grid } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local
import HeureDisp from './heureDisp.component';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { deletePlanning } from '../../../../../actions/delete.action';

class EditAgenda extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,
        };

        this.toggleConfirm = this.toggleConfirm.bind(this); 
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleConfirm(id) {
        confirmAlert({
            title: "Supprimer",
            message: "Confirmes-tu vouloir supprimer cette heure de conduite ?",
            buttons: [
                { label: "Oui", onClick: () => this.handleDelete(id) },
                { label: "Non", onClick: null },
            ],
        });
    }

    handleDelete(id) {
        const { uid } = getLoggedUser();
        const planning_length = this.props.eleve.planning.length;
        this.setState({ loading: true });
        deletePlanning(uid, id).then(() => {
            this.props.fetchData();
            if (planning_length === 1) this.props.toggleEdit();
            else this.setState({ loading: false });
        }).catch(() => this.setState({ loading: false }));
    }

    render() {
        const today = new Date();
        const in2days = today.setDate(today.getDate()+2);
        const planning = this.props.eleve.planning ? this.props.eleve.planning : {};
        const planningKeys = Object.keys(planning).length > 0 ? _.orderBy(_.filter(Object.keys(planning), key => new Date(planning[key].date) >= in2days), key => new Date(planning[key].date).getTime()) : [];
        return (
            <Segment basic loading={this.state.loading} style={{ padding: "0", margin: "0" }}>
                <Grid divided='vertically'>
                {
                    planningKeys.length === 0 ?
                    <Segment raised>
                        <Header icon>
                            <Icon name="car" />
                            <Header.Content>Tu n'as aucune heure de prévue :'(</Header.Content>
                        </Header>
                        <Button
                            positive
                            icon="add"
                            content="Réserver"
                            onClick={() => this.props.history.push('/eleve/conduite/reserver')}
                        />
                    </Segment> :
                    planningKeys.map(key => (
                        <Grid.Row key={key}>
                            <Grid.Column width={16}>
                                <HeureDisp
                                    color="grey"
                                    size="tiny"
                                    heure={planning[key]}
                                    lieuxRDV={this.props.lieuxRDV}
                                    moniteurs={this.props.moniteurs}
                                />
                                <Button
                                    fluid negative
                                    icon="trash"
                                    content="Supprimer"
                                    onClick={() => this.toggleConfirm(key)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    ))
                }
                </Grid>
            </Segment>
        );
    }
}

EditAgenda.propTypes = {
    eleve: PropTypes.object,
    moniteurs: PropTypes.object,
    lieuxRDV: PropTypes.object,
    toggleEdit: PropTypes.func,
    fetchData: PropTypes.func,
};

export default withRouter(EditAgenda);