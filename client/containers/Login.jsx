import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TextField, Button} from 'react-md'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/main.css';
import '../css/util.css';

import cookieFunc from '../containers/cookieFunc.js';
import authenticationAction from '../actions/authAction.jsx';

//Redirect to home
class RedirectClass extends Component {

	render() {
		if(this.props.redirect === true) {
			console.log('document.cookie ' + cookieFunc.getCookie('token'));
			var accessToken = cookieFunc.getCookie('token');
			var data = {
				token: accessToken
			}
			console.log('componentDidMount');
			fetch('/verify',  {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				document.cookie = "verify=" + data.verifyToken;
				
				console.log('verify ' + cookieFunc.getCookie('verify'))
			})
				return <div>
					<Redirect to="/home" />
				</div>
		}
		else {
			return <div></div>
		}
	}
}
var styleeTitle = {
	marginTop: '50px',
};

const styleMargin = {
	marginBottom: '50px'
}

const styleButton = {
	width: '45%',
	height: '40px'
}

class Login extends Component {
	constructor(props) {
		super(props)

		this.handle_change_email = this.handle_change_email.bind(this)
		this.handle_change_password = this.handle_change_password.bind(this)
		this.handle_login = this.handle_login.bind(this)
		this.state = {
			correctPassword: false,
			correctEmail: false,
			redirect: false,
			stylePassword: 'input100',
			errEmail: false,
			errPassword: false
		}
	}

	//verify email
	handle_change_email() {
		var email = this.handle_email.value;
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		console.log(email)

        if (!pattern.test(email)) {
            return this.setState({errEmail: true})
        }
		else this.setState({errEmail: false})
	}

	//verify password
	handle_change_password() {
		var password = this.handle_password.value;
		console.log('data   ' + password)
		
		if(password.length<4) {
            return this.setState({errPassword: true})
		}
		else this.setState({errPassword: false})
	}

    handle_login() {
		if(this.state.errPassword === true || this.state.errEmail === true) {
			console.log('incorrectPas	email')
			return false
		}
		if(document.cookie.split('token')[1] !== undefined) {
			var cookieToken = cookieFunc.getCookie('token');
		}
		console.log('cookiet token ' + cookieToken)
		var data = {
			email: this.handle_email.value,
			password: this.handle_password.value,
			token: cookieToken
		}
		fetch('/login',  {
			method: 'POST',
            headers: {
           	 	'Content-Type': 'application/json',
                'Accept': 'application/json'
        	},
        	body: JSON.stringify(data)
  	  	})
		.then((response) => {
				return response.json();
			})
		.then((data) => {
			console.log('login confirm  ' + data.token + ' redirect: ' + data.redirectServ);
			// document.cookie = 'token='+data.token;
			cookieFunc.setCookie('token', data.token);
			this.props.authenticationAction(true);
			this.setState({redirect: data.redirectServ});
		})
	}
	
	render() {
		if(cookieFunc.getCookie('verify') === 'true') {
			return <Redirect to='/home' />
		}

		else {
			return (
				<div className="user">
					<div className="limiter">
						<h1 style={styleeTitle} >Sign in</h1>
						<div className="container-login100">
							<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
								<RedirectClass redirect={this.state.redirect}/>
								<TextField
									id="floating-center-title"
									label="Email"
									type="email"
									lineDirection="center"
									required
									ref={(handle_email) => this.handle_email = handle_email}
									onChange={this.handle_change_email}
									error={this.state.errEmail}
									style={styleMargin}
								/>	

								<TextField
									id="floating-center-title"
									label="Password"
									type="password"
									required
									passwordIcon={<FontAwesomeIcon icon="eye" />}
									onChange={this.handle_change_password} 
									ref={(handle_password => this.handle_password = handle_password)}
									error={this.state.errPassword}
									style={styleMargin}
								/>				
								<div className="container-login100-form-btn m-t-17">
									<Button raised secondary swapTheming onClick={this.handle_login} style={styleButton}>Sign In</Button>
								</div>
								
							</div>
						</div>
					</div>
					<div id="dropDownSelect1"></div>
				</div>
			)
		}
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

export default connect(mapStateToProps, matchDispatchToProps)(Login, RedirectClass);
