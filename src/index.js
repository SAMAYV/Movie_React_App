import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import './index.css';
import rootReducer from './reducers';

// logger(obj)(next)(action)
// const logger = function({dispatch, getState}) {
// 	return function(next) {
// 		return function(action){
// 			// write middleware code
// 			console.log('ACTION TYPE', action.type);
// 			next(action);
// 		}
// 	}
// }

const logger = ({dispatch, getState}) => (next) => (action) => {
	// write middleware code
	console.log('ACTION TYPE', action.type);
	next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
	<React.StrictMode>
		<App store={store}/>
	</React.StrictMode>,
	document.getElementById('root')
);

