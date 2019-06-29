// React
import React, { Component } from 'react';
import { Button, Form, Segment, Input, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { addCompte } from '../../../../../../actions/add.action';

class Remboursements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            montant: 0,
            type: "Trop perçu",
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
        addCompte(this.props.match.params.id, "remboursements", {
            montant: this.state.montant,
            date: `${day}/${month}/${year}`,
            type: this.state.type,
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
                            placeholder="Type de remboursement"
                            value={this.state.type}
                            onChange={(_, { value }) => this.setState({ type: value })}
                            options={[
                                { key: 0, value: "Trop perçu", text: "Trop perçu" },
                                { key: 1, value: "Avoir", text: "Avoir" },
                            ]}
                        />
                    </Form.Field>
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

Remboursements.propTypes = {
    handleChangeView: PropTypes.func,
    fetchData: PropTypes.func,
    match: PropTypes.object,
    userLevel: PropTypes.number,
};

export default withRouter(Remboursements);