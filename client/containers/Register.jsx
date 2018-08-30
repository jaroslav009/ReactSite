import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import CorrectEmail from './correctData/CorrectEmail.jsx'
import CorrectUser from './correctData/CorrectUser.jsx'
import cookieFunc from './cookieFunc.js';
import validate from './correctData/validate.js';
import authenticationAction from '../actions/authAction.jsx';

class RedirectClass extends Component {
	render() {
		if(this.props.redirect === true) {
			return <div>
				<Redirect to='/login' />
			</div>
		}
		else {
			return <div></div>
		}
	}
}

class Register extends Component {
	constructor(props) {
		super(props);
		this.handle_register = this.handle_register.bind(this);
        this.handle_change_user = this.handle_change_user.bind(this);
		this.handle_change_email = this.handle_change_email.bind(this);
		this.handle_change_first_name = this.handle_change_first_name.bind(this);
		this.handle_change_last_name = this.handle_change_last_name.bind(this);
		this.country_handle = this.country_handle.bind(this);
		this.city_handle = this.city_handle.bind(this);

		this.state = {
			correctEmail: true,
			correctUser: true,
			redirect: false,
			inccorectUser: false,
			inccorectEmail: false,
			first_name_correct: false,
			last_name_correct: false,
			style_username: 'input100',
			style_email: 'input100',
			style_first_name: 'input100',
			style_last_name: 'input100',
			style_city: '',
			style_country: '',
			city: '',
			country: ''
		}
	}

	handle_register() {
		var username = this.handle_username.value;
		var email = this.handle_email.value;
		var first_name = this.handle_first_name.value;
		var last_name = this.handle_last_name.value;

		var data = {
			username: username,
			email: email,
			first_name: first_name,
			last_name: last_name,
			country: this.state.country,
			city: this.state.city
		};
		
		if(this.state.correctUser == false
			|| this.state.correctEmail == false 
			|| this.state.emailCorrect == true 
			|| this.state.inccorectUser == true 
			|| this.state.first_name_correct == false 
			|| this.state.last_name_correct == false) {
			console.log('not correct data')
			return false;
		}

		if(this.state.country === '') {
			this.setState({ style_country: 'select_block' })
			return console.log('inccorect country');
		} else this.setState({ style_country: '' })

		if(this.state.city === '') {
			this.setState({ style_city: 'select_block' });
			return console.log('inccorect city');
		} else this.setState({ style_city: '' });

		fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
        		'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})

		fetch('/registerConfirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
			body: JSON.stringify(data)
		})
            .then(function(response){
                return response.json();
            })
            .then((data) => {
				console.log('hello')
				this.setState({redirect: data.redirectRegister})
            })
	}

	handle_change_first_name() {
		var first_name = this.handle_first_name.value;
		this.setState({
			style_first_name: validate.first_name_func(first_name).validate,
			first_name_correct: validate.first_name_func(first_name).boolean
		})
	}

	handle_change_last_name() {
		var last_name = this.handle_last_name.value;
		this.setState({
			style_last_name: validate.last_name_func(last_name).validate,
			last_name_correct: validate.last_name_func(last_name).boolean
		})

	}

    handle_change_user() {
        var username = this.handle_username.value;

        var data = {username: username};
        fetch('/changeUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function(response){
                return response.json();
            })
            .then((data) => {
                console.log('response  ' + data.usernameCorrect)
				this.setState({inccorectUser: data.usernameCorrect})
		    })
		this.setState({
			style_username: validate.username_func(username).validate,
			correctUser: validate.username_func(username).boolean
		})
    }

    handle_change_email() {
		console.log('handle_change_email ' + this.state.city)
		var email = this.handle_email.value;
		this.setState({
			style_email: validate.email_func(email).validate,
			correctEmail: validate.email_func(email).boolean
		})
        var data = {email: email}
        fetch('/changeEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
		})
            .then(function(response){
                return response.json();
            })
            .then((data) => {
                console.log('response  ' + data.emailCorrect)
                this.setState({inccorectEmail: data.emailCorrect})
            })
	}

	country_handle(event) {
		console.log('country_handle: ' + JSON.stringify(event));
		this.setState({ country: event });
		if(this.state.country === '') this.setState({ style_country: '' });
	}

	city_handle(event) {
		console.log('city: ' + event)
		this.setState({ city: event })
		if(this.state.city === '') this.setState({ style_city: '' });
	}

	render() {
		if(cookieFunc.getCookie('verify') === 'true') {
			return <Redirect to='/' />
		}
		return (
				<div className="user">
					<header className="user__header">
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
						<h1>Sign up</h1>
					</header>
					<RedirectClass redirect={this.state.redirect}/>
					
					<div className="limiter">
					<div className="container-login100">
						<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
							<form className="login100-form validate-form flex-sb flex-w">
								<div className="p-t-31 p-b-9">
									<span className="txt1">
										First name 
									</span>
								</div>
								<div className="wrap-input100 validate-input"> 
									<input type="text" className={this.state.style_first_name} ref={(handle_first_name) => this.handle_first_name = handle_first_name} onChange={this.handle_change_first_name}/>
								</div>
								<div className="p-t-31 p-b-9">
									<span className="txt1">
										Last name 
									</span>
								</div>
								<div className="wrap-input100 validate-input" data-vpalidate = "Username is required">
									<input ref={(handle_last_name) => this.handle_last_name = handle_last_name} className={this.state.style_last_name} onChange={this.handle_change_last_name}/>
								</div>
								<div className="p-t-31 p-b-9">
									<span className="txt1">
										Username
									</span>
									<CorrectUser correct={this.state.inccorectUser} />
								</div>
								<div className="wrap-input100 validate-input" data-vpalidate = "Username is required">
									<input type="text" name="username" ref={(handle_username) => this.handle_username = handle_username} className={this.state.style_username} onChange={this.handle_change_user}/>
								</div>

								<div className="p-t-31 p-b-9">
									<span className="txt1">
										Email
									</span>
									<CorrectEmail correct={this.state.inccorectEmail}/>
								</div>
								<div className="wrap-input100 validate-input" data-validate = "Email is required">
									<input type="email" name="username" ref={(handle_email) => this.handle_email = handle_email} className={this.state.style_email} onChange={this.handle_change_email}/>
								</div>

								<div className="p-t-31 p-b-9">
									<span className="txt1">
										Country
									</span>
								</div>
								<div className="wrap-input100 validate-input" data-vpalidate = "Username is required">
									<div className={this.state.style_country}>
										<CountryDropdown
											onChange={ (event) => this.country_handle(event) } 
											value={this.state.country} 
										/>		
									</div>					
								</div>

								<div className="p-t-31 p-b-9">
									<span className="txt1">
										City 
									</span>
								</div>
								<div className="wrap-input100 validate-input" data-vpalidate = "Username is required">
									<div className={this.state.style_city}>
										<RegionDropdown
										country={this.state.country}
										onChange={ (event) => this.city_handle(event) }
										value={this.state.city}
										/>	
									</div>
																
								</div>
							</form>
							<div className="container-login100-form-btn m-t-17">
								<button onClick={this.handle_register} className="login100-form-btn">
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

function mapStateToProps(state) {
	return {
		verifyTokenAct: state.verifyTokenAct
	}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({authenticationAction: authenticationAction}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);
