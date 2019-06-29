// React
import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

// Local
import ChoiceCalendar from '../components/choiceCalendar.component';
import BigCalendrier from '../components/bigCalendrier.component';

class Calendrier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenType: 'moniteur',
            chosenValue: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, val) {
        let newState = Object.assign({}, this.state);
        newState[key] = val;
        if (key === 'chosenType') newState['chosenValue'] = '';
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <ChoiceCalendar
                    chosenType={this.state.chosenType}
                    chosenValue={this.state.chosenValue}
                    handleChange={this.handleChange}
                />
                <Segment padded>
                {
                    this.state.chosenType === "" || this.state.chosenValue === "" ?
                    <Header content='Veuillez choisir un moniteur ou un élève' /> :
                    <BigCalendrier
                        chosenType={this.state.chosenType}
                        chosenValue={this.state.chosenValue}
                    />
                }
                </Segment>
            </div>
        );
    }
}

export default Calendrier;
