// React
import React, { Component } from 'react';
import { Segment, Header, Button, Checkbox, Divider, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getBoutiques, getElevePanier } from '../../../../actions/get.action';
import { processPayment } from '../../../../actions/processPayment.action';

class Paiement extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            panier: {},
            boutique: {},
            payments: 1,
            CGUaccepted: false,
            loading: false,
        };

        this.getMaxPayment = this.getMaxPayment.bind(this);
        this.handleSendPayment = this.handleSendPayment.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getBoutiques().then(boutique => {
            getElevePanier(uid).then(panier => {
                this.setState({
                    panier, boutique,
                    loading: false,
                });
            });
        });
    }

    getMaxPayment() {
        let maxPayment = 1;
        Object.keys(this.state.panier).forEach(productId => {
            const versements = this.state.boutique[productId].versements;
            if (versements > maxPayment) maxPayment = versements;
        });
        return maxPayment;
    }

    handleSendPayment() {
        this.setState({ loading: true });
        let amount = 0;
        Object.keys(this.state.panier).forEach(productId => amount += this.state.panier[productId]*this.state.boutique[productId].prix);
        if (this.state.CGUaccepted && amount > 0) {
            const eleveId = getLoggedUser().uid;
            processPayment({ amount, eleveId, nbPayments: this.state.payments, paymentType: "panier" }).then(payment_data => {
                const form = document.createElement("form"); form.method = "POST"; form.action = payment_data.payment_URL;
                const element_Data = document.createElement('input'); element_Data.value = payment_data.Data; element_Data.name = "Data";
                const element_InterfaceVersion = document.createElement('input'); element_InterfaceVersion.value = payment_data.InterfaceVersion; element_InterfaceVersion.name = "InterfaceVersion";
                const element_Seal = document.createElement('input'); element_Seal.value = payment_data.Seal; element_Seal.name = "Seal";
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
            <Segment loading={this.state.loading}>
                <Header dividing as="h2" color="orange" content="Paiement" />
                <Form>
                    {
                        Array.apply(null, { length: this.getMaxPayment() }).map((_, i) => (
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label={{ children: <Header content={`Carte bleue en ${i+1} fois`} /> }}
                                    checked={this.state.payments === i+1}
                                    onClick={() => this.setState({ payments: i+1 })}
                                />
                                {i+1 !== this.getMaxPayment() && <Divider />}
                            </Form.Field>
                        ))
                    }
                </Form>
                <br />
                <Header dividing style={{ padding: "0", margin: "0", marginBottom: "10px" }} color="orange" />
                <Checkbox
                    checked={this.state.CGUaccepted}
                    label={{ children: <span>J'accepte les <a href="http://my.conduitecenter.fr/privacyPolicy" rel="noopener noreferrer" target="_blank">conditions générales d'utilisation</a></span> }}
                    onClick={() => this.setState({ CGUaccepted: !this.state.CGUaccepted })}
                />
                <br /><br />
                <Button
                    fluid positive
                    disabled={Object.keys(this.state.panier).length === 0 || !this.state.CGUaccepted}
                    icon="check"
                    content="Valider & Payer"
                    onClick={this.handleSendPayment}
                />
            </Segment>
        );
    }
}

Paiement.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Paiement);