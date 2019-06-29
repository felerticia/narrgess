// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import _ from 'lodash';

// Local
import List from '../components/list.component';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getPDFContrat, getBoutiques, getBoutiquesArchives, getContrats, getEleveVentes } from '../../../../actions/get.action';
import { convert2pdf } from '../../../../actions/convert.action';

class Contrats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ventes: {},
            boutique: {},
            contrats: {},
            loading: true,
        };

        this.filterContrat = this.filterContrat.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getBoutiques().then(onlineBoutique => {
            getBoutiquesArchives().then(archivesBoutique => {
                const boutique = {...onlineBoutique, ...archivesBoutique};
                getContrats().then(contrats => {
                    getEleveVentes(uid).then(ventes => {
                        this.setState({
                            ventes,
                            boutique,
                            contrats,
                            loading: false,
                        });
                    });
                });
            });
        });
    }

    filterContrat(vente) {
        const { produit } = vente;
        const { contrat } = this.state.boutique[produit];
        if (contrat && contrat.length !== 0) return true;
        return false;
    }

    handleClick(vente) {
        const { produit } = vente;
        const { contrat } = this.state.boutique[produit];
        this.setState({ loading: true });
        if (contrat) {
            const { uid } = getLoggedUser();
            getPDFContrat(contrat, uid).then(data => {
                const { html } = data;
                convert2pdf(html, "contrat.pdf");
                this.setState({ loading: false });
            }).catch(() => this.setState({ loading: false }));
        }
    }

    render() {
        const ventes = _.filter(this.state.ventes, this.filterContrat);
        return (
            <Segment raised color="orange" loading={this.state.loading}>
                <Header as="h2" content="Mes contrats" textAlign="center" />
                <List
                    ventes={ventes}
                    boutique={this.state.boutique}
                    buttonTitle="Contrat"
                    handleClick={this.handleClick}
                />
            </Segment>
        );
    }
}

export default Contrats;