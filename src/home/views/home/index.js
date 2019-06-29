// React requirement
import React from 'react';

// Local requirement
import Header from './containers/header.container';
import Boutique from './containers/boutique.container';
import Choisir from './containers/choisir.container';
import CommentCaMarche from './containers/commentCaMarche.container';

const Home = () => (
    <div>
        <Header />
        <Boutique />
        <Choisir />
        <CommentCaMarche />
    </div>
);

Home.propTypes = {};

export default Home;