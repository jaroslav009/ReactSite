import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import authenticationAction from '../actions/authAction.jsx';
import cookieFunc from './cookieFunc';

import '../css/home_page.css';

const bodyStyle = {
	overflow: 'hidden'
}

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// this.props.authenticationAction(cookieFunc.getCookie('verify'));
	}

	render() {
		if(cookieFunc.getCookie('verify') === 'true') {
			return (
				<div className="news_post">
					Hello Post
				</div>
			)
		}
		return (
			<div className="home_container">
				<h1>Create your news</h1>
				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
				<Link className="button_start" to="/register">Getting Started</Link>
			</div>
			
		)
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

export default connect(mapStateToProps, matchDispatchToProps)(Home);