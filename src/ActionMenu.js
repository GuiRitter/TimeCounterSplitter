import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';

import { clearFromLocalStorage, clearTaskCounts, navigate, showHideObservation } from './flux/action';

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
	/></>;
}

export default ActionMenu;
