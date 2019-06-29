// React
import React, { Component } from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

// Local
import MenuTeam from './components/menuTeam.component';
import Agence from './components/agence.component';

// data
import TeamData from './data';

class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeAgence: "Montpellier",
        };
    }

    render() {
        return (
            <div>
                <Segment attached inverted padded="very" textAlign="center" size="large">
                    <Header as="h2" color="orange" content="Nos auto-écoles" />
                    <p>Il y’aura toujours une agence Conduite Center proche de chez vous</p>
                </Segment>
                <MenuTeam
                    activeAgence={this.state.activeAgence}
                    handleChangeActiveAgence={activeAgence => this.setState({ activeAgence })}
                />
                <Container style={{ paddingTop: "5em", paddingBottom: "5em" }}>
                    <Agence {...TeamData[this.state.activeAgence]} />
                </Container>
            </div>
        )
    }
}

export default Team;