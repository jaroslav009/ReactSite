import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import authenticationAction from '../actions/authAction.jsx';
import cookieFunc from './cookieFunc';

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        cookieFunc.setCookie('token', '');
        cookieFunc.setCookie('verify', false);
        this.props.authenticationAction(false);
    }
    render() {
        return <Redirect to="/" />
    }
}

function mapStateToProps(state) {
	return {
		verifyTokenAct: state.verifyTokenAct
	}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({authenticationAction: authenticationAction}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Logout);
