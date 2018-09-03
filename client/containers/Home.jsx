import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	Button,
	Card,
	CardTitle,
	CardText,
	Media,
	MediaOverlay,
} from 'react-md';

import authenticationAction from '../actions/authAction.jsx';
import cookieFunc from './cookieFunc';

import '../css/home_page.scss';

const bodyStyle = {
	overflow: 'hidden'
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		// this.props.authenticationAction(cookieFunc.getCookie('verify'));
		console.log('cookie func',cookieFunc.getCookie('verify'));
		if(cookieFunc.getCookie('verify') === 'true') {
			fetch('/general-news', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({
					posts: data.news
				})
				console.log('state ' + JSON.stringify(this.state.posts));
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('change')
	}

	render() {
		if(cookieFunc.getCookie('verify') === 'true') {
			return (
				<div className="news_post">
				{
					this.state.posts.map((res, i) => {
						console.log('hello wordl ' + JSON.stringify(res))
						return <div>
							<h1>title {res.title}</h1>
							<p>shortDescription {res.shortDescription}</p>
							<p>longDescription {res.longDescription}</p>
							<p>img {res.img_url}</p>
							<hr/>
						</div>
					})
				}
					<img src="http://res.cloudinary.com/dpmdahanv/image/upload/v1535886685/wfwsvdoepxlpuyjzra6c.png" alt="Nature from lorempixel" />
				</div>
			)
		}
		return (
			<div className="home_container">
				<h1>Logo</h1>
				<p>Create your first news <strong>is easy</strong></p>
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