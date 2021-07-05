import React from 'react';
import { Provider } from 'react-redux';
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

// export const StoreContext = createContext();

// all the consumers get re-rendered whenever store changes
// class Provider extends React.Component {
// 	render() {
// 		const {store} = this.props;
// 		return <StoreContext.Provider value={store}>
// 			{this.props.children}
// 		</StoreContext.Provider>
// 	}
// }

// export function connect(callback) {
// 	return function(Component) {
// 		class ConnectedComponent extends React.Component {
// 			constructor(props) {
// 				super(props);
// 				this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
// 			}
// 			componentWillUnmount() {
// 				this.unsubscribe();
// 			}
// 			render() {
// 				const {store} = this.props; 
// 				const state = store.getState();
// 				const dataToBePassedAsProps = callback(state);
// 				return <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
// 			}
// 		}
// 		class ConnectedComponentWrapper extends React.Component {
// 			render () {
// 				return (
// 					<StoreContext.Consumer>
// 						{(store) => <ConnectedComponent store={store} />}
// 					</StoreContext.Consumer>
// 				)
// 			}
// 		}
// 		return ConnectedComponentWrapper;
// 	}
// } 

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App store={store}/>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

