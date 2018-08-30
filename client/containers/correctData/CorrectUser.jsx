import React, { Component } from 'react';

export default class CorrectUser extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(this.props.correct) {
			return(
				<div>
					<p>Username exist</p>
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
