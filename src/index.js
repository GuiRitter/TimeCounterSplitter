import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import reducer from './flux/reducer';

/**
 * https://github.com/zalmoxisus/redux-devtools-extension
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createRootReducer = () => combineReducers({
	reducer,
});

const store = createStore(
	createRootReducer(), // root reducer with router state
	composeEnhancers(
		applyMiddleware(
			thunk
		)
	)
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
			{/* <br/><input onClick={() => document.getElementById('testOutput').value = localStorage.getItem('TimeCounterSplitter')} type='button' value='get local storage for test'/>
			<br/><input id='testOutput'/> */}
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
