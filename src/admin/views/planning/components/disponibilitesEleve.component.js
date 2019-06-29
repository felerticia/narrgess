// React
import React, { Component } from 'react';
import { Grid, Segment, Header, Button, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

class DisponibilitesEleve extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.toggleAllDays = this.toggleAllDays.bind(this);
    }

    handleClick(disponibilite) {
        let disponibilites = this.props.disponibilites.slice(0);
        if (!disponibilites.find(disp => disp === disponibilite)) disponibilites.push(disponibilite);
        else disponibilites.splice(disponibilites.indexOf(disponibilite), 1);
        this.props.handleChange(disponibilites);
    }

    handleClickDay(key) {
        let disponibilites = this.props.disponibilites.slice(0);
        if (!disponibilites.find(disp => disp === `${key}0` )) disponibilites.push(`${key}0`);
        else disponibilites.splice(disponibilites.indexOf(`${key}0`), 1);
        if (!disponibilites.find(disp => disp === `${key}1` )) disponibilites.push(`${key}1`);
        else disponibilites.splice(disponibilites.indexOf(`${key}1`), 1);
        this.props.handleChange(disponibilites);
    }

    toggleAllDays() {
        if (this.props.disponibilites.length === 12) {
            this.props.handleChange([]);
        } else {
            let disponibilites = [];
            for (let i = 0; i < 6; i += 1) {
                for (let j = 0; j < 2; j += 1) {
                    disponibilites.push(`${i}${j}`);
                }
            }
            this.props.handleChange(disponibilites);
        }
    }

    render() {
        return (
            <div>
                <Button
                    inverted
                    color='orange'
                    attached='top'
                    content='Tous les jours'
                    active={this.props.disponibilites.length === 12}
                    onClick={this.toggleAllDays}
                />
                <Segment raised attached>
                    <Grid columns={1} verticalAlign='middle'>                        
                        <Grid.Row>
                        {
                            days.map((day, key) => (
                                <Grid.Column key={key}>
                                    { key !== 0 && <Divider /> }
                                    <Header
                                        as='h3'
                                        textAlign='center'
                                        content={day}
                                        onClick={() => this.handleClickDay(key)}
                                    />
                                    <Button.Group widths={8} fluid>
                                        <Button
                                            inverted
                                            color='orange'
                                            content='Matin'
                                            active={this.props.disponibilites.find(disp => disp === `${key}0`) ? true : false}
                                            onClick={() => this.handleClick(`${key}0`)}
                                        />
                                        <Button
                                            inverted
                                            color='orange'
                                            content='Après-midi'
                                            active={this.props.disponibilites.find(disp => disp === `${key}1`) ? true : false}
                                            onClick={() => this.handleClick(`${key}1`)}
                                        />
                                    </Button.Group>
                                </Grid.Column>
                            ))
                        }
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

DisponibilitesEleve.propTypes = {
    handleChange: PropTypes.func,
    disponibilites: PropTypes.array,
};

export default DisponibilitesEleve;
