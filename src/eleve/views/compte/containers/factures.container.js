// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

// Local
import List from '../components/list.component';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getPDFFacture, getBoutiques, getBoutiquesArchives, getEleve } from '../../../../actions/get.action';
import { convert2pdf } from '../../../../actions/convert.action';

class Factures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            factures: {},
            boutique: {},
            loading: true,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getBoutiques().then(onlineBoutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const boutique = {...onlineBoutique, ...archivesBoutique};
                getEleve(uid).then(eleve => {
                    const compte = eleve.compte ? eleve.compte : {};
                    const ventes = compte.ventes ? compte.ventes : {};
                    let factures = [];
                    Object.values(ventes).forEach(vente => {
                        const produit = boutique[vente.produit];
                        factures.push({ id: vente.factureId, date: vente.date, produit, eleve, vente });
                    });
                    this.setState({ factures, boutique, loading: false });
                });
            });
        });
    }

    handleClick(facture) {
        this.setState({ loading: true });
        getPDFFacture(facture).then(data => {
            const { html } = data;
            convert2pdf(html, `facture-${facture.id}.pdf`);
            this.setState({ loading: false });
        }).catch(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <Segment raised color="orange" loading={this.state.loading}>
                <Header as="h2" content="Mes factures" textAlign="center" />
                <List
                    ventes={this.state.factures}
                    boutique={this.state.boutique}
                    buttonTitle="Facture"
                    handleClick={this.handleClick}
                />
            </Segment>
        );
    }
}

export default Factures;