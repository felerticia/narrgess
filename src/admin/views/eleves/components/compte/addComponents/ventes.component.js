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

class Ventes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            produit: "",
            quantite: 1,
            date: moment(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        if(e) e.preventDefault();
        this.setState({ loading: true });
        const date = this.state.date._d;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const month = (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
        const year = date.getFullYear();
        addCompte(this.props.match.params.id, "ventes", {
            produit: this.state.produit,
            quantite: this.state.quantite,
            date: `${day}/${month}/${year}`,
            user: getLoggedUser().uid,
        }).then(() => {
            this.setState({ loading: false });
            this.props.fetchData();
            this.props.handleChangeView('list');
        });
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
                        <label>Produit</label>
                        <Dropdown
                            fluid selection search
                            options={Object.keys(this.props.boutique).map(key => ({
                                key,
                                value: key,
                                text: `${this.props.boutique[key].type} - ${this.props.boutique[key].nom}`,
                            }))}
                            value={this.state.produit}
                            onChange={(_, { value }) => this.setState({ produit: value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Quantité</label>
                        <Input
                            fluid min={1}
                            type="number"
                            placeholder="Quantité ..."
                            value={this.state.quantite}
                            onChange={(_, { value }) => this.setState({ quantite: parseFloat(value) })}
                        />
                    </Form.Field>
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

Ventes.propTypes = {
    boutique: PropTypes.object,
    userLevel: PropTypes.number,
    fetchData: PropTypes.func,
    handleChangeView: PropTypes.func,
    match: PropTypes.object,
};

export default withRouter(Ventes);