// React
import React, { Component } from 'react';
import { Segment, Dropdown, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

// Local
import Filter from './filter.component';
import List from './list.component';

// actions
import { getArchives, getUsers, getAdmins, getSecretaires, getEleves, getBoutiques, getBoutiquesArchives } from '../../../../actions/get.action';

const DMYStringToDate = DMY => {
    const DMY_array = DMY.split("/");
    return new Date(`${DMY_array[2]}-${DMY_array[1]}-${DMY_array[0]}`);
};

class ListVentes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            user: [],
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
                        getBoutiques().then(onlineBoutique => {
                            getBoutiquesArchives().then(archivesBoutique => {
                                const boutique = {...onlineBoutique, ...archivesBoutique};
                                getEleves().then(eleves => {
                                    let data = [];
                                    Object.values(eleves).forEach(eleve => {
                                        const compte = eleve.compte ? eleve.compte : {};
                                        const ventes = compte.ventes ? compte.ventes : {};
                                        Object.values(ventes).forEach(vente => {
                                            let userName = "/";
                                            if (vente.user){
                                                if (users[vente.user]) {
                                                    if (users[vente.user].type === "admin") userName = `${admins[vente.user].nom} ${admins[vente.user].prenom}`;
                                                    else if (users[vente.user].type === "secretaire") userName = `${secretaires[vente.user].nom} ${secretaires[vente.user].prenom}`;
                                                }
                                            }
                                            const venteToAdd = Object.assign(vente, {
                                                eleve: `${eleve.dossier.eleve.nom} ${eleve.dossier.eleve.prenom}`,
                                                produit: boutique[vente.produit],
                                                user: userName,
                                                userKey: vente.user,
                                            });
                                            data.push(venteToAdd);
                                        });
                                    });
                                    this.setState({ data, users, admins, secretaires, loading: false });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    filter(data) {
        let dateCondition = true;
        const userCondition = this.state.user.length !== 0 ? this.state.user.find(user => user === data.userKey) ? true : false : true;
        const { from, to } = this.props.match.params;
        if (from && to) {
            const fromDate = moment(from).toDate();
            const toDate = moment(to).toDate();
            toDate.setHours(0); toDate.setMinutes(0); toDate.setSeconds(0);
            const date = moment(data.date, "DD/MM/YYYY").toDate();
            dateCondition = date >= fromDate && date <= toDate;
        }
        return dateCondition && userCondition;
    }

    getCSVHeaders() {
        return ([
            { label: "Date", key: "date" },
            { label: "Eleve", key: "eleve" },
            { label: "Produit", key: "produit" },
            { label: "Quantite", key: "quantite" },
            { label: "Montant TTC", key: "prix" },
            { label: "Chargé", key: "user" },
        ]);
    }

    getCSVData() {
        return _.orderBy(_.filter(this.state.data, this.filter), vente => DMYStringToDate(vente.date), ["desc"]).map(vente => ({
            date: vente.date,
            eleve: vente.eleve,
            produit: vente.produit ? vente.produit.nom : "",
            quantite: vente.quantite,
            prix: `${vente.produit ? vente.quantite * vente.produit.prix : ""}`,
            user: vente.user,
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
                    data={data}
                    headers={headers}
                    csvName="ventes.csv"
                />
            </Segment>
        );
    }
}

ListVentes.propTypes = {
    match: PropTypes.object,
};

export default ListVentes;