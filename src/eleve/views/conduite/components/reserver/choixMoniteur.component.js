// React
import React, { Component } from 'react';
import { Segment, Header, Dropdown, Rating, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// actions
import { getLieuxRDV, getMoniteurs } from '../../../../../actions/get.action';
import { getDownloadURL } from '../../../../../actions/storage.action';

const degreesToRadians = degrees => degrees * Math.PI / 180;

const distance = (coords1, coords2) => {
    const lat1 = coords1.lat; const lng1 = coords1.lng;
    const lat2 = coords2.lat; const lng2 = coords2.lng;
    const R = 6371;
    const phi1 = degreesToRadians(lat1);
    const phi2 = degreesToRadians(lat2);
    const dLat = degreesToRadians(lat2-lat1);
    const dLng = degreesToRadians(lng2-lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
              Math.cos(phi1) * Math.cos(phi2) * 
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

class ChoixMoniteurs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moniteurs: {},
            lieuxRDV: {},
            avatarUrl: "",
            loading: true,
        };

        this.filterLieuxMoniteurs = this.filterLieuxMoniteurs.bind(this);
    }

    UNSAFE_componentWillMount() {
        getLieuxRDV().then(lieuxRDV => {
            getMoniteurs().then(moniteurs => {
                getDownloadURL('/moniteurs/avatar.jpg').then(avatarUrl => {
                    this.setState({
                        moniteurs, lieuxRDV, avatarUrl,
                        loading: false,
                    });
                });
            });
        });
    }

    filterLieuxMoniteurs() {
        if (Object.values(this.props.coords).length === 0) return {};
        const filterFunc = key => {
            if (!this.state.moniteurs[key].eleveDisplay) return false;
            const lieuxRDV = this.state.moniteurs[key].lieuxRDV ? this.state.moniteurs[key].lieuxRDV : {};
            for (let i = 0; i < Object.values(lieuxRDV).length; i += 1) {
                const lieux = this.state.lieuxRDV[Object.values(lieuxRDV)[i].lieuxRDV] ? this.state.lieuxRDV[Object.values(lieuxRDV)[i].lieuxRDV] : {};
                if (lieux.coords) {
                    if (distance(lieux.coords, this.props.coords) <= this.props.coords.distance) return true;
                }
            }
            return false;
        }
        const moniteursKey = Object.keys(this.state.moniteurs).filter(filterFunc);
        const moniteurs = {};
        moniteursKey.forEach(key => moniteurs[key] = this.state.moniteurs[key]);
        return moniteurs;
    }

    render() {
        const dimmed = Object.values(this.props.coords).length === 0;
        const moniteurs = this.filterLieuxMoniteurs();
        return (
            <Segment color="orange" loading={this.state.loading}>
                <Header content="Moniteur" textAlign="center" />
                {
                    dimmed ? <Header block textAlign="center" content="Il faut un choisir un lieux de RDV" /> :
                    <Dropdown
                        fluid search selection
                        value={this.props.moniteur}
                        loading={this.state.loading}
                        placeholder="Moniteur ..."
                        onChange={(_, { value }) => this.props.handleChange('moniteur', value)}
                        options={Object.keys(moniteurs).map(key => ({
                            key,
                            value: key,
                            text: `${moniteurs[key].nom} ${moniteurs[key].prenom}`,
                            content: (
                                <div>
                                    <Image src={moniteurs[key].imageUrl ? moniteurs[key].imageUrl : this.state.avatarUrl} avatar />{" "}
                                    {moniteurs[key].nom} {moniteurs[key].prenom}{" "}
                                    <Rating disabled icon='star' rating={moniteurs[key].rating ? moniteurs[key].rating : 3} maxRating={5} />
                                </div>
                            ),
                        }))}
                    />
                }
            </Segment>
        );
    }
}

ChoixMoniteurs.propTypes = {
    moniteur: PropTypes.string,
    coords: PropTypes.object,
    handleChange: PropTypes.func,
}

export default ChoixMoniteurs;
