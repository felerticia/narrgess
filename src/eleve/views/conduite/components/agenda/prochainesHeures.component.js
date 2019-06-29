// React
import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import HeureDisp from './heureDisp.component';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getListHours } from '../../../../../actions/get.action';
import { convert2pdf } from '../../../../../actions/convert.action';

class ProchainesHeures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handlePrint = this.handlePrint.bind(this);
    }

    handlePrint() {
        this.setState({ loading: true });
        const { uid } = getLoggedUser();
        getListHours(uid).then(data => {
            const { html } = data;
            convert2pdf(html, "Mes-Prochaines-Lecons.pdf");
            this.setState({ loading: false });
        }).catch(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <div>
                <Header
                    as="h4"
                    color="orange"
                    textAlign="center"
                    content="Mes prochaines leçons"
                />
                {
                    this.props.planning.length <= 1 ? <Header color="grey" textAlign="center" content="---" /> :
                    <HeureDisp
                        color="grey"
                        size="tiny"
                        heure={this.props.planning[1]}
                        lieuxRDV={this.props.lieuxRDV}
                        moniteurs={this.props.moniteurs}
                    />
                }
                {
                    this.props.planning.length <= 2 ? <Header color="grey" textAlign="center" content="---" /> :
                    <HeureDisp
                        color="grey"
                        size="tiny"
                        heure={this.props.planning[2]}
                        lieuxRDV={this.props.lieuxRDV}
                        moniteurs={this.props.moniteurs}
                    />
                }
                <Button
                    fluid
                    loading={this.state.loading}
                    icon="download"
                    color="orange"
                    size="small"
                    content="Télécharger"
                    disabled={this.props.planning.length === 0}
                    onClick={this.handlePrint}
                />
                <br />
            </div>
        );
    }
}

ProchainesHeures.propTypes = {
    planning: PropTypes.array,
    moniteurs: PropTypes.object,
    lieuxRDV: PropTypes.object,
}

export default ProchainesHeures;