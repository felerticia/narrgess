// React
import React from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';

const Error = () => (
    <Segment raised>
        <Header dividing as='h1' color='orange' textAlign='center'>
            <Icon name='lightning' color='orange' />Oops !
        </Header>
        <Header as='h2' textAlign='center' content="Une erreur est survenue" />
        <Header as='h4' dividing color="orange" />
    </Segment>
);

export default Error;