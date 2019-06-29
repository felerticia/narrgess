// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

// Local
import Routes from './routes/';

// CSS
import 'semantic-ui-css/semantic.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// moment
import 'moment/locale/fr';

// actions
import { onAuthStateChanged } from './actions/auth.action';
import { getUser } from './actions/get.action';

class App extends Component {
    constructor() {
        super();

        this.state = {
            user: null,
            loading: true,
            sonClicked: false,
        };
    }

    UNSAFE_componentWillMount() {
        onAuthStateChanged(user => {
            this.setState({ loading: true });
            if (user === null) this.setState({ user, loading: false });
            else {
                getUser(user.uid)
                .then(user => this.setState({ user, loading: false }))
                .catch(() => this.setState({ loading: false }));
            }
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.loading ?
                    <Dimmer active inverted><Loader indeterminate size='huge' /></Dimmer> :
                    <Routes user={this.state.user} />
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
