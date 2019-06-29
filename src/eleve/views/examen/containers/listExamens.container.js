// React
import React, { Component } from 'react';
import { Segment, Table, Header, Button } from 'semantic-ui-react';

// actions
import { getLoggedUser } from '../../../../actions/auth.action';
import { getExamens, getExamenConvocation } from '../../../../actions/get.action';
import { convert2pdf } from '../../../../actions/convert.action';

const addZero = number => number < 10 ? `0${number}` : `${number}`;

const getResult = examen => {
    let result = "";
    const eleves = examen.eleves ? examen.eleves : {};
    const { uid } = getLoggedUser();
    Object.values(eleves).forEach(eleveData => {
        if (eleveData.eleve === uid) result = eleveData.result ? eleveData.result : "";
    });
    return result;
}

class ListExamens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            examens: {},
            loading: true,
        };

        this.handleDownload = this.handleDownload.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { uid } = getLoggedUser();
        getExamens().then(allExamens => {
            const examens = {}
            Object.keys(allExamens).forEach(key => {
                const eleves = allExamens[key].eleves ? allExamens[key].eleves : {};
                Object.values(eleves).forEach(eleveData => {
                    if (eleveData.eleve === uid) examens[key] = allExamens[key];
                });
            });
            this.setState({ examens, loading: false });
        });
    }

    handleDownload(key) {
        const { uid } = getLoggedUser();
        this.setState({ loading: true });
        getExamenConvocation(key, uid).then(data => {
            const { html } = data;
            convert2pdf(html, "convocation.pdf");
            this.setState({ loading: false });
        }).catch(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <Segment color="orange" loading={this.state.loading}>
                <Header content="Liste des examens" textAlign="center" />
                <Table striped textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Horaire</Table.HeaderCell>
                            <Table.HeaderCell>Lieux</Table.HeaderCell>
                            <Table.HeaderCell>Convocation</Table.HeaderCell>
                            <Table.HeaderCell>Résultat</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.state.examens &&
                        Object.keys(this.state.examens).map(key => {
                            const examen = this.state.examens[key];
                            const startDate = new Date(examen.start);
                            const endDate = new Date(examen.end);
                            const date = `${addZero(startDate.getDate())}/${addZero(startDate.getMonth()+1)}/${startDate.getFullYear()}`;
                            const start = `${addZero(startDate.getHours())}:${addZero(startDate.getMinutes())}`;
                            const end = `${addZero(endDate.getHours())}:${addZero(endDate.getMinutes())}`;
                            const result = getResult(examen);
                            return (
                                <Table.Row key={key}>
                                    <Table.Cell>{examen.type}</Table.Cell>
                                    <Table.Cell>{date}</Table.Cell>
                                    <Table.Cell>{start} - {end}</Table.Cell>
                                    <Table.Cell>{examen.lieux}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            circular primary
                                            icon="download"
                                            onClick={() => this.handleDownload(key)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{result}</Table.Cell>
                                </Table.Row>
                            );
                        })
                    }
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

export default ListExamens;
