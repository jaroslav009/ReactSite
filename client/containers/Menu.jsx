import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, IndexRoute }  from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Components
import Home from './Home.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Logout from './Logout.jsx';
import User from './User.jsx';
import Message from './Message.jsx';
import CreateNews from './Create_news.jsx';

// Begin include FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)
// End include FontAwesome

import cookieFunc from './cookieFunc'

// Include action
import authenticationAction from '../actions/authAction.jsx'

// General styles
import '../css/bootstrap.min.css';
import '../css/main.scss'

// Top menu
class Menu extends Component {
    constructor(props) {
        super(props);
        this.verifyUserHandle = this.verifyUserHandle.bind(this)
    }

    async verifyUserHandle() {
        var accessToken = cookieFunc.getCookie('token');
        var data = {
            token: accessToken
        }
        await fetch('/verify',  {
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
            this.props.authenticationAction(data.verifyToken);
            
        })
    }
    
    render() {
        if(cookieFunc.getCookie('verify') == 'true' || this.props.verifyTokenAct.text == true) {
			return (
				<Router>
					<div className="main_menu">
						<nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
							<a className="navbar-brand" href="/">Logo</a>
							<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
							<span className="navbar-toggler-icon" />
							</button>
							<div className="collapse navbar-collapse" id="navbarNavDropdown">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item">
										<Link className="nav-link" to="/home" onClick={this.verifyUserHandle}>News</Link>
									</li>
								</ul>
								
								<form className="form-inline my-2 my-lg-0">
                                
									<ul className="navbar-nav mr-sm-4">
                                        <li className="nav-item">
											<Link className="nav-link" to="/create_news" onClick={this.verifyUserHandle}>Create News</Link>
										</li>
                                        <li className="nav-item">
											<Link className="nav-link" to="/profile" onClick={this.verifyUserHandle}>Profile</Link>
										</li>

                                        <li className="nav-item logout_item">
											<Link className="nav-link" to="/logout">Logout</Link>
										</li>
                                        
									</ul>
								</form>
							</div>
						</nav>
						<Route path='/home' component={Home} />
						<Route path="/profile" component={Profile} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/user" component={User} />
                        <Route path="/message" component={Message} />
                        <Route path="/create_news" component={CreateNews} />
					</div>			
				</Router>
			)
        }
        else {
            return (
                <Router>
                    <div className="main_menu">
                        <nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
                            <a className="navbar-brand" href="/">Logo</a>
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
                            <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/home" onClick={this.verifyUserHandle}>Home</Link>
                                    </li>    
                                </ul>
    
                                <form className="form-inline my-2 my-lg-0">
                                    <ul className="navbar-nav mr-sm-4">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login" onClick={this.verifyUserHandle}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register" onClick={this.verifyUserHandle}>Register</Link>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </nav>
                        <Route path="/home" component={Home} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/user" component={User} />
                    </div>
                </Router>
    
            );
        }
    }
}

function mapStateToProps(state) {
	return {
        verifyTokenAct: state.verifyTokenAct,
	}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({authenticationAction: authenticationAction}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Menu);