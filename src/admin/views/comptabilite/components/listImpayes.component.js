// React
import React, { Component } from 'react';
import { Segment, Popup, Icon, Header, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import Filter from './filter.component';
import List from './list.component';

// actions
import { getEleves } from '../../../../actions/get.action';

const DMYStringToDate = DMY => {
    const DMY_array = DMY.split("/");
    return new Date(`${DMY_array[2]}-${DMY_array[1]}-${DMY_array[0]}`);
};

class ListImpayes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
        }

        this.filter = this.filter.bind(this);
        this.getCSVHeaders = this.getCSVHeaders.bind(this);
        this.getCSVData = this.getCSVData.bind(this);
    }

    UNSAFE_componentWillMount() {
        getEleves().then(eleves => {
            let data = [];
            Object.values(eleves).forEach(eleve => {
                const compte = eleve.compte ? eleve.compte : {};
                const impayes = compte.impayes ? compte.impayes : {};
                const notes = eleve.notes ? eleve.notes : {};
                Object.values(impayes).forEach(impaye => {
                    const impayeToAdd = Object.assign(impaye, {
                        notes: _.orderBy(Object.values(notes), note => new Date(note.date).getTime(), ["desc"]),
                        eleve: `${eleve.dossier.eleve.nom} ${eleve.dossier.eleve.prenom}`,
                    });
                    data.push(impayeToAdd);
                });
            });
            this.setState({ data, loading: false });
        });
    }

    filter(data) {
        const { from, to } = this.props.match.params;
        if (from && to) {
            const fromDate = moment(from).toDate();
            const toDate = moment(to).toDate();
            toDate.setHours(0); toDate.setMinutes(0); toDate.setSeconds(0);
            const date = moment(data.date, "DD/MM/YYYY").toDate();
            return date >= fromDate && date <= toDate;
        }
        return true;
    }

    getCSVHeaders() {
        return ([
            { label: "Date", key: "date" },
            { label: "Eleve", key: "eleve" },
            { label: "Montant", key: "montant" },
            { label: "Type", key: "type" },
            { label: "Informations", key: "info" },
        ]);
    }

    getCSVData() {
        return _.orderBy(_.filter(this.state.data, this.filter), impaye => DMYStringToDate(impaye.date), ["desc"]).map(impaye => ({
            date: impaye.date,
            eleve: impaye.eleve,
            montant: impaye.montant,
            type: impaye.type,
            info: (
                <Popup flowing hoverable trigger={<Icon size="big" name="info circle" />}>
                {
                    impaye.notes.length >= 1 ?
                    <Grid centered divided columns={Math.min(impaye.notes.length, 5)}>
                        <Grid.Row>
                        {
                            [...Array(5).keys()].map(i => (
                                impaye.notes.length > i ?
                                <Grid.Column textAlign="center">
                                    <Header>Note {i+1}</Header>
                                    <p>{impaye.notes[i].message}</p>
                                </Grid.Column> : null
                            ))
                        }
                        </Grid.Row>
                    </Grid> :
                    <p>Pas de notes sur cet élève</p>  
                }
                </Popup>
            )
        }));
    }

    render() {
        const headers = this.getCSVHeaders();
        const data = this.getCSVData();
        return (
            <Segment basic loading={this.state.loading}>
                <Filter />
                <List
                    headers={headers}
                    data={data}
                    csvName="impayes.csv"
                />
            </Segment>
        );
    }
}

ListImpayes.propTypes = {
    match: PropTypes.object,
};

export default ListImpayes;