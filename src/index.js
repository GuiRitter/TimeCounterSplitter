import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import './index.css';

import reducer from './flux/reducer';

import App from './App';

const store = configureStore({
	reducer: { reducer },
	middleware: getDefaultMiddleware => getDefaultMiddleware({})
});

ReactDOM.render(
	<Provider store={store}><React.StrictMode><App />{/* <br/><input onClick={() => document.getElementById('testOutput').value = localStorage.getItem('TimeCounterSplitter')} type='button' value='get local storage for test'/>
		<br/><input id='testOutput'/> */}</React.StrictMode></Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
