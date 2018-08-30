import React, { Component } from 'react';

import PostForm from './PostForm.jsx';
import Posts from './Posts.jsx';

class Main extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<PostForm />
				<Posts fetchPosts="" posts="" deletePost=""/>
			</div>
		)
	}
}

export default Main;
