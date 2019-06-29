// React requirement
import React from 'react';
import { Grid, Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// Style
import Style from '../styles/headerSlide.style';

const HeaderSlide = props => (
    <Grid style={Style.grid} verticalAlign="middle">
        <Grid.Row style={Style.row}>
            <Grid.Column computer={8} tablet={16} mobile={16} style={Style.columnText}>
                <h2 style={Style.customLineSpacing}>
                    <span style={Style.hugeText}>A ce prix, le permis, c'est dans</span><br />
                    <span style={Style.massiveText}>LA POCHE !</span>
                </h2>
                <hr style={Style.hrDivider} />
                <h4>Découvrez nos forfaits permis B adaptés à tous les besoins et tous les budgets, à partir de 699 €</h4>
                <Button
                    color="blue"
                    content="En savoir +"
                    onClick={() => props.history.push("/home/forfaitsPermis")}
                />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16} style={Style.columnImage}>
                <Image
                    centered size="big"
                    bordered={false} style={Style.image}
                    src="/img/home-slide.png"
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

HeaderSlide.propTypes = {
    history: PropTypes.object,
};

export default withRouter(HeaderSlide);