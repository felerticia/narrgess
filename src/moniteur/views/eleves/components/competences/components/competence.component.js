// React
import React, { Component } from 'react';
import { Segment, Header, Table, Dropdown, Form, TextArea } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// actions
import { getEleveCompetence } from '../../../../../../actions/get.action';
import { editEleveCompetence } from '../../../../../../actions/edit.action';

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

        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        getEleveCompetence(id, this.props.competence).then(data => this.setState({ data, loading: false }));
    }

    handleChange(key, type, level) {
        this.setState({ loading: true });
        const { id } = this.props.match.params;
        editEleveCompetence(id, this.props.competence, key, type, level).then(() => {
            this.fetchData();
        });
    }

    render() {
        return (
            <Segment basic style={{ margin: "0", padding: "0" }} loading={this.state.loading}>
                <Segment
                    raised={this.state.hovered}
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}
                    style={{ cursor: "pointer" }}
                >
                    <Header
                        as="h2"
                        icon={this.state.visible ? 'triangle down' : 'triangle right'}
                        content={capitalize(this.props.competence)}
                        style={{ margin: "0" }}
                        onClick={() => this.setState({ visible: !this.state.visible })}
                    />
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
                                            <br />
                                            <Form>
                                                <TextArea
                                                    autoHeight
                                                    placeholder="Commentaire..."
                                                    value={this.state.data[key] ? this.state.data[key].comment ? this.state.data[key].comment : "" : ""}
                                                    onChange={(_, { value }) => this.handleChange(key, 'comment', value)}
                                                />
                                            </Form>
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            <Dropdown
                                                fluid selection
                                                value={this.state.data[key] ? this.state.data[key].level ? this.state.data[key].level : 0 : 0}
                                                options={[
                                                    { text: "Non abordée", value: 0, icon: "eye slash" },
                                                    { text: "Abordée", value: 1, icon: "eye" },
                                                    { text: "Traitée", value: 2, icon: "thumbs up" },
                                                    { text: "Assimilée", value: 3, icon: "check circle" },
                                                ]}
                                                onChange={(_, { value }) => this.handleChange(key, 'level', value)}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                            </Table.Body>
                        </Table>
                    }
                </Segment>
            </Segment>
        );
    }
}

Competence.PropTypes = {
    competence: PropTypes.string,
    titles: PropTypes.object,
    match: PropTypes.object,
}

export default withRouter(Competence);