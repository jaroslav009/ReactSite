import React, { Component } from 'react';

export default class CorrectEmail extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(this.props.correct) {
			return(
				<div>
					<p>Email exist</p>
				</div>
			)
		}

		else {
			return (
				<div></div>
			)
		}

	}
}