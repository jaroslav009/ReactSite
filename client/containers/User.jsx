import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import ImageAvatar from '../img/user.png';
import cookieFunc from './cookieFunc';

class User extends Component {
    constructor(props) {
        super(props);

        this.send_message = this.send_message.bind(this);

        this.state = {
            avatar: '',
            first_name: '',
            last_name: '',
            country: '',
            city: '',
            email: '',
            username: '',
            rootUser: '',
        }
    }
    
    async componentDidMount() {
        var data = {
            username: window.location.search.slice(4),
            token: cookieFunc.getCookie('token'),
        };
        
        await fetch('/user-data', {
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
            console.log('data ' + JSON.stringify(data))
            this.setState({
                avatar: data.avatar,
                first_name: data.first_name,
                last_name: data.last_name,
                country: data.country,
                city: data.city,
                email: data.email,
                username: data.username,
                rootUser: data.rootUser,
            })
        })
    }

    async send_message() {
        console.log('send')
        var data = {
            first_email: this.state.email,
            token: cookieFunc.getCookie('token'),
        }
        await fetch('/generate_url', {
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
            console.log('data ' + JSON.stringify(data.url))
        })
    }

    render() {
        var avatar;
        var send;
        if(this.state.avatar === '') avatar = <img src={ImageAvatar} className="rounded-circle img-thumbnail" id="avatar" />
        else avatar = <img src={this.state.avatar} className="rounded-circle img-thumbnail" id="avatar" />
        if(this.state.rootUser === true) send = '';
        else send = <button onClick={this.send_message} className="btn btn-primary">Send Message</button>;
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
								<h5>{this.state.first_name} {this.state.last_name}</h5>
                                <p><b>Username: </b> {this.state.username} </p>
                                <p><b>Email: </b> {this.state.email} </p>
                                <p><b>Country: </b> {this.state.country} </p>
                                <p><b>City: </b> {this.state.city} </p>
                                {send}
							</div>
						</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;