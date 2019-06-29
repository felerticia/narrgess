// React
import React, { Component } from 'react';
import { Segment, Button, Input, Checkbox, Header } from 'semantic-ui-react';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { processPayment } from '../../../../actions/processPayment.action';

class Montant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            CGUaccepted: false,
            loading: false,
        };

        this.handleSendPayment = this.handleSendPayment.bind(this);
    }

    handleSendPayment() {
        this.setState({ loading: true });
        if (this.state.CGUaccepted && this.state.value > 0) {
            const amount = this.state.value;
            const eleveId = getLoggedUser().uid;
            processPayment({ amount, eleveId, nbPayments: 1, paymentType: "financer" }).then(data => {
                const payment_data = data;
                const form = document.createElement("form"); form.method = "POST"; form.action = payment_data.payment_URL;
                const element_Data = document.createElement('input'); element_Data.name = "Data"; element_Data.value = payment_data.Data;
                const element_InterfaceVersion = document.createElement('input'); element_InterfaceVersion.name = "InterfaceVersion"; element_InterfaceVersion.value = payment_data.InterfaceVersion;
                const element_Seal = document.createElement('input'); element_Seal.name = "Seal"; element_Seal.value = payment_data.Seal;
                form.appendChild(element_Data); form.appendChild(element_InterfaceVersion); form.appendChild(element_Seal);
                document.body.appendChild(form);
                form.submit();
            });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <Segment>
                <Header as="h2" textAlign="center" content="Financer mon permis" />
                <Input
                    fluid
                    min={0}
                    type="number"
                    value={this.state.value}
                    label="Montant à régler :"
                    onChange={(_, { value }) => this.setState({ value: parseInt(value, 10) })}
                />
                <br />
                <Checkbox
                    checked={this.state.CGUaccepted}
                    label={{ children: <span>J'accepte les <a href="http://my.conduitecenter.fr/privacyPolicy" rel="noopener noreferrer" target="_blank">conditions générales d'utilisation</a></span> }}
                    onClick={() => this.setState({ CGUaccepted: !this.state.CGUaccepted })}
                />
                <br /><br />
                <Button
                    fluid positive
                    loading={this.state.loading}
                    disabled={this.state.montant <= 0 || !this.state.CGUaccepted}
                    icon="check"
                    content="Paiement"
                    onClick={this.handleSendPayment}
                />
            </Segment>
        );
    }
}

export default Montant