import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';

import { changeObservation, navigate } from './flux/action';
import { getSelectedTask } from './flux/selector';

import { setRef } from './util/system';

let observationField = null;

function componentDidMount(props, selectedTask) {
	if (observationField) {
		observationField.value = (selectedTask || {}).observation || '';
	}
}

function ChangeObservation(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();

	const selectedTask = useSelector(getSelectedTask);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, selectedTask);
		}
	});

	return <><h1>{`new observation for task ${selectedTask.name}`}</h1><input
		onClick={() => dispatch(navigate(state.TASK_ACTION_MENU, selectedTask.name))}
		type='button'
		value='back'
	/><input
		ref={setRef(ref => observationField = ref)}
	/><input
		onClick={() => dispatch(changeObservation(
			selectedTask.name,
			observationField.value
		))}
		type='button'
		value='change observation'
	/></>;
}

export default ChangeObservation;
