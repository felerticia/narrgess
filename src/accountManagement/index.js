// React
import React, { Component } from 'react';
import { Grid, Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Local
import Error from './components/error.component';
import ResetPassword from './components/resetPassword.component';

// actions
import { checkActionCode } from '../actions/auth.action';

class AccountManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {},
            error: false,
            loading: true,
        };

        this.getArguments = this.getArguments.bind(this);
    }

    UNSAFE_componentWillMount() {
        const args = this.getArguments();
        checkActionCode(args["oobCode"] ? args["oobCode"] : "").then(info => {
            this.setState({
                info,
                loading: false
            });
        }).catch(() => {
            this.setState({
                error: true,
                loading: false,
            });
        });
    }

    getArguments() {
        const { search } = this.props.location;
        const search_obj = {};
        if (search.length !== 0) {
            const search_arr = search.substring(1).split("&");
            search_arr.forEach(arg => {
                const arg_arr = arg.split("=");
                search_obj[arg_arr[0]] = arg_arr[1];
            });
        }
        return search_obj;
    }

    render() {
        return (
            <div className='login-form'>
                <style>{`body > div, body > div > div, body > div > div > div.login-form {height: 100%;}`}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column computer={8} tablet={16}>
                        <Image src='img/logo-complete.png' />
                        <br />
                        <Segment raised loading={this.state.loading}>
                        {
                            this.state.error ? <Error /> :
                            this.state.info.operation === "PASSWORD_RESET" ? <ResetPassword actionCode={this.getArguments()["oobCode"]} /> :
                            <Error />
                        }
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

AccountManagement.propTypes = {
    location: PropTypes.object,
};

export default AccountManagement;