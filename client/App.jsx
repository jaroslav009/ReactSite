import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Menu from './containers/Menu.jsx'

import reduce from './reducers/reduce';

const store = createStore(reduce);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<Menu/>
				</div>
			</Provider>
		);
	}
}

export default App
