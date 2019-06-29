// React
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
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

class ListRemboursements extends Component {
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
                const remboursements = compte.remboursements ? compte.remboursements : {};
                Object.values(remboursements).forEach(remboursement => {
                    const remboursementToAdd = Object.assign(remboursement, {
                        eleve: `${eleve.dossier.eleve.nom} ${eleve.dossier.eleve.prenom}`,
                    });
                    data.push(remboursementToAdd);
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
        ]);
    }

    getCSVData() {
        return _.orderBy(_.filter(this.state.data, this.filter), remboursement => DMYStringToDate(remboursement.date)).map(remboursement => ({
            date: remboursement.date,
            eleve: remboursement.eleve,
            montant: remboursement.montant,
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
                    csvName="remboursements.csv"
                />
            </Segment>
        );
    }
}

ListRemboursements.propTypes = {
    match: PropTypes.object,
};

export default ListRemboursements;