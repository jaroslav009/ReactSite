import React, { Component } from 'react';

export default class CorrectPassword extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(this.props.correct) {
			return(
				<div></div>
			)
		}

		else {
			return (
				<div>
					<p>Некоректный пароль</p>
				</div>
			)
		}

	}
}