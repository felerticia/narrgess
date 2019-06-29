// React
import React, { Component } from 'react';
import { Segment, Button, Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getContrats } from '../../../../../actions/get.action';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            contrats: {},
        };
    }

    UNSAFE_componentWillMount() {
        getContrats().then(contrats => this.setState({ contrats, loading: false }));
    }

    render() {
        return (
            <Segment basic loading={this.state.loading}>
                <Grid divided="vertically" centered stackable>
                    <Grid.Row>
                    {
                        Object.keys(this.state.contrats).map(key => (
                            <Grid.Column key={key} computer={4} mobile={8}>
                                <Button fluid basic onClick={() => this.props.history.push(`/admin/configuration/contrats/${key}`)}>
                                    <Header icon>
                                        <Icon name="file alternate" />
                                        {this.state.contrats[key].nom}
                                    </Header>
                                </Button>
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

List.propTypes = {
    history: PropTypes.object,
};

export default List;