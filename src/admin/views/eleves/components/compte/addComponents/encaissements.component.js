// React
import React, { Component } from 'react';
import { Button, Form, Segment, Dropdown, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { addCompte } from '../../../../../../actions/add.action';
import { getLoggedUser } from '../../../../../../actions/auth.action';

const paiements = [
    "Carte bancaire (Agence)",
    "Carte bancaire (En ligne)",
    "Chèque",
    "Espèces",
    "Virement bancaire",
];

class Encaissements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            montant: 0,
            paiementPar: "",
            chequeNumber: "",
            date: moment(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if(e) e.preventDefault();
        if (this.state.paiementPar) {
            this.setState({ loading: true });
            const date = this.state.date._d;
            const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            const month = (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
            const year = date.getFullYear();
            addCompte(this.props.match.params.id, "encaissements", {
                montant: this.state.montant,
                paiementPar: this.state.paiementPar,
                date: `${day}/${month}/${year}`,
                chequeNumber: this.state.chequeNumber,
                user: getLoggedUser().uid,
            }).then(() => {
                this.setState({ loading: false });
                this.props.fetchData();
                this.props.handleChangeView('list');
            });
        } else {
            // TODO : add error message
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <Segment basic style={{ margin: 0, padding: 0 }} loading={this.state.loading}>
                <Button
                    content='Retour'
                    icon='arrow left'
                    onClick={() => this.props.handleChangeView('list')}
                />
                <br /><br />
                <Form>
                    <Form.Field>
                        <label>Montant (en euros)</label>
                        <Input
                            fluid
                            type="number"
                            value={this.state.montant}
                            onChange={(_, { value }) => this.setState({ montant: parseFloat(value) })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Paiement par :</label>
                        <Dropdown
                            fluid selection
                            options={paiements.map(paiement => ({
                                key: paiement,
                                value: paiement,
                                text: paiement,
                            }))}
                            value={this.state.paiementPar}
                            onChange={(_, { value }) => this.setState({ paiementPar: value })}
                        />
                    </Form.Field>
                    {
                        this.state.paiementPar === "Chèque" &&
                        <Form.Field>
                            <label>Numéro de chèque :</label>
                            <Input
                                fluid
                                value={this.state.chequeNumber}
                                onChange={(_, { value }) => this.setState({ chequeNumber: value })}
                            />
                        </Form.Field>
                    }
                    <Form.Field>
                        <label>Date</label>
                        <DatePicker
                            inline
                            minDate={this.props.userLevel >= 1 ? null : moment()}
                            selected={this.state.date}
                            onChange={value => this.setState({ date: value })}
                            dateFormat="DD/MM/YYYY"
                            locale='fr'
                        />
                    </Form.Field>
                    <Button
                        positive
                        icon="add"
                        content="Ajouter"
                        disabled={this.props.userLevel >= 1 ? false : this.state.date._d.getTime() + 24*3600*1000 < new Date().getTime()}
                        onClick={this.handleSubmit}
                    />
                </Form>
            </Segment>
        );
    }
}

Encaissements.propTypes = {
    handleChangeView: PropTypes.func,
    fetchData: PropTypes.func,
    match: PropTypes.object,
    userLevel: PropTypes.number,
};

export default withRouter(Encaissements);