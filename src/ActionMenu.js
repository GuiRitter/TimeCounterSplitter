import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';
import { LOCAL_STORAGE_NAME } from './constant/system';

import { clearFromLocalStorage, clearTaskCounts, navigate, overwriteSavedData, showHideObservation } from './flux/action';

function componentDidMount(props) {
}

function ActionMenu(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});

	const observationVisible = useSelector(state => !!(((state || {}).reducer || {}).observationVisible && true));

	return <><input
		onClick={() => dispatch(navigate(state.TASK_LIST))}
		type='button'
		value='back'
	/><input
		onClick={() => dispatch(navigate(state.ACTION_ADD))}
		type='button'
		value='add new task'
	/><input
		onClick={() => dispatch(clearTaskCounts())}
		type='button'
		value='clear times'
	/><input
		onClick={() => dispatch(clearFromLocalStorage())}
		type='button'
		value='clear storage'
	/><input
		onClick={() => dispatch(navigate(state.ACTION_SET_HOURS_PER_DAY))}
		type='button'
		value='set hours per day'
	/><input
		onClick={() => dispatch(showHideObservation())}
		type='button'
		value={`${observationVisible ? 'hide' : 'show'} observations`}
	/><input
		onClick={() => {
			// TODO implement a proper saved data management page; probably overwrite state to navigate to home page
			const w = window.open('', '_blank');
			if (!w) return; // popup blocked

			const html = `
				<!doctype html>
				<html>
				<head>
					<link rel="icon" href="https://guilherme-alan-ritter.net/time_counter_splitter/favicon.ico" />
					<title>saved data · Time Counter Splitter</title>
					<style>
						* {
							background-color: #000000;
							color: #959595
						}
					
						input, button {
							background-color: #101010;
							border-color: #898989;
							color: #ffffff
						}

						.floating_action_button {
							position: absolute;
							bottom: 1em;
							right: 1em;
						}

						a:hover {
							color: #ffffff;
							background-color: #595959;
						}
					</style>
				</head>
				<body><pre>${JSON.stringify(JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)), null, 2)}</pre></body>
				</html>
			`;

			w.document.open();
			w.document.write(html);
			w.document.close();
		}}
		type='button'
		value='show saved data'
	/><input
		onClick={() => dispatch(overwriteSavedData())}
		type='button'
		value='overwrite saved data'
	/></>;
}

export default ActionMenu;
