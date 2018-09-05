import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TextField} from 'react-md'

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
			styleEmail: 'input100',
			errEmail: 'md-cell md-cell--bottom errTextField'
		}
	}

	//verify email
	handle_change_email() {
		var email = this.handle_email.value;
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		console.log(email)

        if (!pattern.test(email)) {
            return this.setState({styleEmail: 'input100 red_input', correctEmail: false})
        }
		else this.setState({styleEmail: 'input100 green_input', correctEmail: true})
	}

	//verify password
	handle_change_password() {
		var password = this.handle_password.value;
		console.log('data   ' + JSON.stringify(this.props.verifyTokenAct))
		
		if(password.length<4) {
            return this.setState({stylePassword: 'input100 red_input', correctPassword: false})
		}
		else this.setState({stylePassword: 'input100 green_input', correctPassword: true})
	}

    handle_login() {
		if(this.state.correctPassword === false || this.state.correctEmail === false) {
			console.log('correctPas	')
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
								<form className="login100-form validate-form flex-sb flex-w">
									<TextField
										id="floating-center-title"
										label="Email"
										type="email"
										lineDirection="center"
										className={this.state.errEmail}
										required
										ref={(handle_email) => this.handle_email = handle_email}
										onChange={this.handle_change_email}
										error={true}
									/>								

									<div className="p-t-13 p-b-9">
										<span className="txt1">
											Password
										</span>
									</div>
									<div className="wrap-input100 validate-input" data-validate = "Password is required">
										<input className={this.state.stylePassword} type="password" onChange={this.handle_change_password} ref={(handle_password => this.handle_password = handle_password)} />
									</div>
									
								</form>
								<div className="container-login100-form-btn m-t-17">
									<button className="login100-form-btn" onClick={this.handle_login}>
										Sign In
									</button>
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
