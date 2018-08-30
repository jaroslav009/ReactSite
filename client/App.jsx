import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)

import './css/bootstrap.min.css';

import RouteSite from './RouteSite.jsx';

import reduce from './reducers/reduce.jsx';

const store = createStore(
	reduce);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<RouteSite/>
				</div>
			</Provider>
		);
	}
}

export default App
