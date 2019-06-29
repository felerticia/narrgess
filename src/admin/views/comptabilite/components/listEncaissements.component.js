// React
import React, { Component } from 'react';
import { Segment, Dropdown, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import Filter from './filter.component';
import List from './list.component';

// actions
import { getArchives, getUsers, getAdmins, getSecretaires, getEleves } from '../../../../actions/get.action';

const paiements = [
    "Tous",
    "Carte bancaire (Agence)",
    "Carte bancaire (En ligne)",
    "Chèque",
    "Espèces",
    "Virement bancaire",
];

const DMYStringToDate = DMY => {
    const DMY_array = DMY.split("/");
    return new Date(`${DMY_array[2]}-${DMY_array[1]}-${DMY_array[0]}`);
};

class ListEncaissements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            paiementPar: "",
            user: [],
            data: [],
            users: {},
            admins: {},
            secretaires: {},
        };

        this.filter = this.filter.bind(this);
        this.getCSVHeaders = this.getCSVHeaders.bind(this);
        this.getCSVData = this.getCSVData.bind(this);
    }

    UNSAFE_componentWillMount() {
        getArchives().then(archives => {
            getUsers().then(allUsers => {
                const users = {...allUsers, ...archives.users};
                getAdmins().then(allAdmins => {
                    const admins = {...allAdmins, ...archives.admins};
                    getSecretaires().then(allSecretaires => {
                        const secretaires = {...allSecretaires, ...archives.secretaires};
                        getEleves().then(eleves => {
                            let data = [];
                            Object.values(eleves).forEach(eleve => {
                                const compte = eleve.compte ? eleve.compte : {};
                                const encaissements = compte.encaissements ? compte.encaissements : {};
                                Object.values(encaissements).forEach(encaissement => {
                                    let userName = "/";
                                    if (encaissement.user) {
                                        if (users[encaissement.user]) {
                                            if (users[encaissement.user].type === "admin") userName = `${admins[encaissement.user].nom} ${admins[encaissement.user].prenom}`;
                                            else if (users[encaissement.user].type === "secretaire") userName = `${secretaires[encaissement.user].nom} ${secretaires[encaissement.user].prenom}`;
                                        }
                                    }
                                    const encaissementToAdd = Object.assign(encaissement, {
                                        eleve: `${eleve.dossier.eleve.nom} ${eleve.dossier.eleve.prenom}`,
                                        user: userName,
                                        userKey: encaissement.user,
                                    });
                                    data.push(encaissementToAdd);
                                });
                            });
                            this.setState({ data, users, admins, secretaires, loading: false });
                        });
                    });
                });
            });
        });
    }

    filter(data) {
        let dateCondition = true;
        const paymentCondition = this.state.paiementPar.length !== 0 && this.state.paiementPar !== "Tous" ? data.paiementPar === this.state.paiementPar : true;
        const userCondition = this.state.user.length !== 0 ? this.state.user.find(user => user === data.userKey) ? true : false : true;
        const { from, to } = this.props.match.params;
        if (from && to) {
            const fromDate = moment(from).toDate();
            const toDate = moment(to).toDate();
            toDate.setHours(0); toDate.setMinutes(0); toDate.setSeconds(0);
            const date = moment(data.date, "DD/MM/YYYY").toDate();
            dateCondition = date >= fromDate && date <= toDate;
        }
        return dateCondition && userCondition && paymentCondition;
    }

    getCSVHeaders() {
        return ([
            { label: "Date", key: "date" },
            { label: "Eleve", key: "eleve" },
            { label: "Montant", key: "montant" },
            { label: "Paiement par", key: "paiementPar" },
            { label: "Chargé", key: "user" },
        ]);
    }

    getCSVData() {
        return _.orderBy(_.filter(this.state.data, this.filter), encaissement => DMYStringToDate(encaissement.date), ["desc"]).map(encaissement => ({
            date: encaissement.date,
            eleve: encaissement.eleve,
            montant: encaissement.montant,
            paiementPar: encaissement.paiementPar,
            user: encaissement.user,
        }));
    }

    render() {
        const headers = this.getCSVHeaders();
        const data = this.getCSVData();
        return (
            <Segment basic loading={this.state.loading}>
                <Filter />
                <Segment raised>
                    <Header as='h4' content='Autres filtres' />
                    <Dropdown
                        fluid selection
                        placeholder="Moyen de paiement..."
                        value={this.state.paiementPar}
                        options={paiements.map(paiement => ({ key: paiement, text: paiement, value: paiement }))}
                        onChange={(_, { value }) => this.setState({ paiementPar: value })}
                    />
                    <Divider />
                    <Dropdown
                        fluid selection search multiple
                        placeholder="Chargé..."
                        value={this.state.user}
                        options={_.filter(Object.keys(this.state.users), key => this.state.users[key].type === "admin" || this.state.users[key].type === "secretaire").map(key => ({
                            key,
                            value: key,
                            text: this.state.users[key].type === "admin" ? `${this.state.admins[key].nom} ${this.state.admins[key].prenom}` : `${this.state.secretaires[key].nom} ${this.state.secretaires[key].prenom}`,
                        }))}
                        onChange={(_, { value }) => this.setState({ user: value })}
                    />
                </Segment>
                <List
                    headers={headers}
                    data={data}
                    csvName="encaissements.csv"
                />
            </Segment>
        );
    }
}

ListEncaissements.propTypes = {
    match: PropTypes.object,
};

export default ListEncaissements;