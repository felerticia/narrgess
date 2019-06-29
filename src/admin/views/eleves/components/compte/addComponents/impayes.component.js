// React
import React, { Component } from 'react';
import { Button, Form, Segment, Dropdown, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { addCompte } from '../../../../../../actions/add.action';

class Impayes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            montant: 0,
            type: "Chèque",
            chequeNumber: "",
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
        addCompte(this.props.match.params.id, "impayes", {
            montant: this.state.montant,
            date: `${day}/${month}/${year}`,
            type: this.state.type,
            chequeNumber: this.state.chequeNumber,
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
                        <label>Montant (en euros)</label>
                        <Input
                            fluid
                            type="number"
                            value={this.state.montant}
                            onChange={(_, { value }) => this.setState({ montant: parseFloat(value) })}
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
                    <Form.Field>
                        <label>Type</label>
                        <Dropdown
                            fluid selection
                            value={this.state.type}
                            onChange={(_, { value }) => this.setState({ type: value })}
                            options={[
                                { key: "Chèque", value: "Chèque", text: "Chèque" },
                                { key: "En ligne", value: "En ligne", text: "En ligne" },
                                { key: "Autre", value: "Autre", text: "Autre" },
                            ]}
                        />
                    </Form.Field>
                    {
                        this.state.type === "Chèque" &&
                        <Form.Field>
                            <label>Numéro de chèque :</label>
                            <Input
                                fluid
                                value={this.state.chequeNumber}
                                onChange={(_, { value }) => this.setState({ chequeNumber: value })}
                            />
                        </Form.Field>
                    }
                    <Button
                        positive
                        icon="add"
                        content="Ajouter"
                        onClick={this.handleSubmit}
                    />
                </Form>
            </Segment>
        );
    }
}

Impayes.propTypes = {
    handleChangeView: PropTypes.func,
    fetchData: PropTypes.func,
    match: PropTypes.object,
    userLevel: PropTypes.number,
};

export default withRouter(Impayes);