import React, { PureComponent } from 'react';
import Popup from 'reactjs-popup';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import SkyLight from 'react-skylight';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import ImageAvatar from '../img/user.png';

import cookieFunc from './cookieFunc.js';
import '../css/profile.css';
import 'react-datepicker/dist/react-datepicker.css';

class RenderLocation extends PureComponent {
	render() {
		if(this.props.country != '' || this.props.city != '') {
			return <div>
				<p><i className="fa fa-map-marker" aria-hidden="true" /> {this.props.country} {this.props.city}.</p>
				<hr />
			</div>
			
		}
		else {
			return <div></div>
		}
	}
}

class Profile extends PureComponent {
	constructor(props) {
		super(props);
		this.changeData = this.changeData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.upload = this.upload.bind(this);
		this.popup_trigger = this.popup_trigger.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);

		this.first_name_handle = this.first_name_handle.bind(this);
		this.last_name_handle = this.last_name_handle.bind(this);
		this.country_handle = this.country_handle.bind(this);
		this.city_handle = this.city_handle.bind(this);
		
		this.state = {
			open: false,
			user: {},
			userInput: {},
			city: '',
			country: '',
			style_first_name: 'input100',
			style_last_name: 'input100',
			style_edit_block: 'hidden',
			picture: {},
			avatar: '',
			date: moment(),
			avatar_submit: 'hidden',
		}
	}

	async componentDidMount() {
		console.log('componentDidMount')
		var data = {
			token: cookieFunc.getCookie('token')
		}
		await fetch('/get-data',  {
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
				console.log(JSON.stringify(data.profile_image))
				this.setState({
					avatar: data.profile_image,
					user: data,
					userInput: {
						first_name: data.first_name,
						last_name: data.last_name
					},
					country: data.country,
					city: data.city
				})
			})
	}

	changeData() {
		console.log('change ' + this.state.country)
		var data = {
			first_name: this.first_name.value,
			last_name: this.last_name.value,
			country: this.state.country,
			city: this.state.city,
			date: this.state.date,
			token: cookieFunc.getCookie('token')
		}

		if(this.state.style_first_name == 'input100 red_input' || this.state.style_last_name == 'input100 red_input') {
			return false;
		}
		fetch('/profile-change', {
			method: 'POST',
			headers: {
		   	 	'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}

	first_name_handle(event){
		var pattern = /^[a-zA-Zа-яА-Я']/u;

        if (!pattern.test(event.target.value)) {
            this.setState({ style_first_name: 'input100 red_input' })
		}
		if(this.first_name.value.length < 2) {
			this.setState({ style_first_name: 'input100 red_input' })
		} else { 
				this.setState({ style_first_name: 'input100' }) 
		}
		this.setState({ userInput: { first_name: this.first_name.value } });
	}
	
	last_name_handle(event) {
		if(event.target.value.length < 2) {
			this.setState({style_last_name: 'input100 red_input'});
		} else { this.setState( { style_last_name: 'input100' } ) }
		this.setState({ userInput: { last_name: this.last_name.value } })
	}

	country_handle(event) {
		console.log('country_handle: ' + JSON.stringify(event));
		if(event == '') {
			return false
		}
		this.setState({ country: event });
	}

	city_handle(event) {
		console.log('city: ' + event)
		this.setState({ city: event })

		console.log(JSON.stringify((this.state.userInput)));
	}

	handleChange(event) {
		this.setState({ picture: event.target.files[0], avatar_submit: 'btn btn-primary' })
		console.log(this.state.picture);
	}

	popup_trigger() {
		this.setState({ 
			userInput: {
				first_name: this.first_name.value,
				last_name: this.last_name.value
			}
		});
		this.simpleDialog.show();
	}
	
	async upload() {
		this.setState({ avatar_submit: 'hidden', })
		
		var form = new FormData();
		this.state.picture.token = cookieFunc.getCookie('token');
		form.append('image', this.state.picture, this.state.picture.name);
		form.append('token', cookieFunc.getCookie('token'));
		form.append('name', this.state.picture.name);
		
		// Transfer image to server
		await fetch('/upload',  {
			method: 'POST',
        	body: form
		});

		// Transfer data to server
		var data = {
			token: cookieFunc.getCookie('token')
		}
		await fetch('/get-data',  {
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
				console.log('data profile '+JSON.stringify(data.profile_image))
				this.setState({
					avatar: data.profile_image,
				})
			})
	}

	handleChangeDate(date) {
		console.log(JSON.stringify(date))
		this.setState({
		  date: date
		});
	  }

	render() {
			var myBigGreenDialog = {
				top: '37%',
				display: 'flex',
				justifyContent: 'center',
		  	};
	  
			var avatar;
			if(this.state.avatar == '') {
				avatar = <img src={ImageAvatar} className="rounded-circle img-thumbnail" id="avatar" />
			} else avatar = <img src={this.state.avatar} className="rounded-circle img-thumbnail" id="avatar" />
			return (
				<div className="container">
					<div className="row">
					
					<div className="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center profile_margin">

						<div className="row">
							<div className="col-lg-12 col-sm-12 col-12 profile-header" />
						</div>
						<div className="row user-detail">
							<div className="col-lg-12 col-sm-12 col-12">
								{avatar}
								<input type="file" name="file" id="file" className="rounded-circle img-thumbnail" onChange={this.handleChange} />
								<div>
									<input type="submit" value="Submit" className={this.state.avatar_submit} onClick={this.upload} />
								</div>

								<h5>{this.state.user.first_name} {this.state.user.last_name}</h5>
								<RenderLocation country={this.state.user.country} city={this.state.user.city}/>
							</div>
						</div>
						
						<div className="row">
							<div className="col-md-12">
							<button onClick={this.popup_trigger} className="btn btn-primary btn_modal">Open Modal</button>
								<SkyLight
									dialogStyles={myBigGreenDialog}
									hideOnOverlayClicked 
									ref={ref => this.simpleDialog = ref} 
								>
									<div className="user">
							
										<div className="limiter">
											<div className="container">
												<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
													<form className="login100-form validate-form flex-sb flex-w">
														<div className="p-t-31 p-b-9">
															<span className="txt1">
																First name
															</span>
														</div>
														<div className="wrap-input100 validate-input">
															<input className={this.state.style_first_name} type="text" onChange={this.first_name_handle} value={this.state.userInput.first_name} ref={first_name => this.first_name = first_name} />
														</div>

														<div className="p-t-31 p-b-9">
															<span className="txt1">
																Last name
															</span>
														</div>
														<div className="wrap-input100 validate-input">
															<input className={this.state.style_last_name} type="text" onChange={this.last_name_handle} value={this.state.userInput.last_name} ref={last_name => this.last_name = last_name} />
														</div>

														<div className="p-t-31 p-b-9">
															<span className="txt1">
																Date
															</span>
														</div>
														<div className="wrap-input100 validate-input">
															<DatePicker
																className="selected"
																selected={this.state.date}
																locale="en"
																onChange={this.handleChangeDate}
																showTimeSelect
																dateFormat="LLL"
															/>
														</div>	

														<div className="p-t-31 p-b-9">
															<span className="txt1">
																Country
															</span>
														</div>
														<div className="wrap-input100 validate-input">
															<CountryDropdown
																onChange={ (event) => this.country_handle(event) } 
																value={this.state.country} 
																/>
														</div>

														<div className="p-t-31 p-b-9">
															<span className="txt1">
																City
															</span>
														</div>
														<div className="wrap-input100 validate-input">
															<RegionDropdown
																country={this.state.country}
																onChange={ (event) => this.city_handle(event) }
																value={this.state.city}
																/>
														</div>														

													</form>
													<div className="container-login100-form-btn m-t-55">
														
														<button className="login100-form-btn" onClick={this.changeData}>
															Change
														</button>
													</div>
												</div>
											</div>
										</div>
`									</div>
								</SkyLight>
							</div>
						
						</div>
					</div>
					</div>
				</div>
			)
	}
}

export default Profile;