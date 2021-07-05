import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import './index.css';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

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
	if(typeof action !== 'function'){
		console.log('ACTION TYPE', action.type);
	}
	// passing action to reducer
	next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
// 	// write middleware code
// 	if(typeof action === 'function'){
// 		action(dispatch);
// 		return;
// 	}
// 	next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
	<React.StrictMode>
		<App store={store}/>
	</React.StrictMode>,
	document.getElementById('root')
);

