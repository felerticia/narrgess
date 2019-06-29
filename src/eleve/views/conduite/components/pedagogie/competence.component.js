// React
import React, { Component } from 'react';
import { Segment, Header, Table, Icon, Grid, Progress } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getLoggedUser } from '../../../../../actions/auth.action';
import { getEleveCompetence } from '../../../../../actions/get.action';

const capitalize = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

class Competence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            hovered: false,
            visible: false,
            loading: true,
        };

        this.getLevel = this.getLevel.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getEleveCompetence(uid, this.props.competence).then(data => this.setState({ data, loading: false }));
    }

    getLevel() {
        let level = 0;
        Object.keys(this.props.titles).forEach(key => {
            level += this.state.data[key] ? this.state.data[key].level ? this.state.data[key].level : 0 : 0;
        });
        return Math.round(level/(3*Object.keys(this.props.titles).length)*100);
    }

    render() {
        return (
            <Segment basic style={{ margin: "0", padding: "0" }} loading={this.state.loading}>
                <Segment
                    raised={this.state.hovered}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}
                    onClick={() => this.setState({ visible: !this.state.visible })}
                    style={{ cursor: "pointer" }}
                >
                    <Grid>
                        <Grid.Column verticalAlign="middle" mobile={16} tablet={6} computer={4}>
                            <Header
                                as="h2"
                                icon={this.state.visible ? 'triangle down' : 'triangle right'}
                                content={capitalize(this.props.competence)}
                                style={{ margin: "0" }}
                            />
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle" mobile={16} tablet={10} computer={12}>
                            <Progress
                                indicating progress
                                percent={this.getLevel()}
                                style={{ margin: "0 !important", marginBottom: "5px" }} />
                        </Grid.Column>
                    </Grid>
                    {
                        !this.state.visible ? null :
                        <Table striped>
                            <Table.Body>
                            {
                                Object.keys(this.props.titles).map(key => (
                                    <Table.Row key={key}>
                                        <Table.Cell textAlign="left">
                                            <b style={{ color: "#f2711c" }}>{`${key}/`}</b>{" "}
                                            <b>{this.props.titles[key]}</b><br />
                                            {this.state.data[key] && this.state.data[key].comment && this.state.data[key].comment.length > 0 && <div><br />{this.state.data[key].comment}</div>}
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            <Icon name="eye" color={this.state.data[key] && this.state.data[key].level >= 1 ? "orange" : "black"} />&nbsp;&nbsp;&nbsp;
                                            <Icon name="thumbs up" color={this.state.data[key] && this.state.data[key].level >= 2 ? "orange" : "black"} />&nbsp;&nbsp;&nbsp;
                                            <Icon name="check circle" color={this.state.data[key] && this.state.data[key].level >= 3 ? "orange" : "black"} />&nbsp;&nbsp;&nbsp;
                                            <Icon name="comment" color={this.state.data[key] && this.state.data[key].comment && this.state.data[key].comment.length > 0 ? "orange" : "black"} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                            </Table.Body>
                        </Table>
                    }
                </Segment>
                <br />
            </Segment>
        );
    }
}

Competence.PropTypes = {
    competence: PropTypes.string,
    titles: PropTypes.object,
}

export default Competence;