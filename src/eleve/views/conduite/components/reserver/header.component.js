// React
import React, { Component } from 'react';
import { Segment, Grid, Button, Responsive } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getEleveNbHours } from '../../../../../actions/get.action';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nbHeures: 0,
            loading: true,
        }
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        const typeRDV = "-LCkVGoOWzkn9hwCjHGk";
        getEleveNbHours(uid, typeRDV).then(({ nbHeures }) => this.setState({ nbHeures, loading: false }));
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <Grid>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column width={5}>
                            <Responsive
                                as={() => <Button fluid icon="arrow left" content="Retour" onClick={() => this.props.history.push('/eleve/conduite')} />}
                                minWidth={1024}
                            />
                            <Responsive
                                as={() => <Button fluid icon="arrow left" onClick={() => this.props.history.push('/eleve/conduite')} />}
                                maxWidth={1023}
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            Il te reste {this.state.nbHeures - this.props.heuresChoisies.length} heures à placer
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

Header.propTypes = {
    history: PropTypes.object,
    heuresChoisies: PropTypes.array,
}

export default withRouter(Header);