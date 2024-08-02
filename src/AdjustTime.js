import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as operation from './constant/operation';
import * as state from './constant/state';

import { adjustTime, navigate } from './flux/action';

import { getSelectedTask } from './flux/selector';

import TaskList from './TaskList';
import { setRef } from './util/system';

let timeLeftField = null;
let timeRightField = null;

function AdjustTime(props) {

	const selectedTask = useSelector(getSelectedTask);

	const dispatch = useDispatch();

	return <><h1>{`adjust task ${selectedTask.name}'s time`}</h1><input
		onClick={() => dispatch(navigate(state.TASK_ACTION_MENU, selectedTask.name))}
		type='button'
		value='back'
	/><input
		onClick={() => {
			timeLeftField.value = '';
			timeRightField.value = '';
		}}
		type='button'
		value='clear'
	/><input
		ref={setRef(ref => timeLeftField = ref)}
	/><input
		ref={setRef(ref => timeRightField = ref)}
	/><input
		onClick={() => dispatch(adjustTime(
			selectedTask.name,
			timeLeftField.value,
			timeRightField.value,
			operation.INCREMENT
		))}
		type='button'
		value='increase time'
	/><input
		onClick={() => dispatch(adjustTime(
			selectedTask.name,
			timeLeftField.value,
			timeRightField.value,
			operation.DECREMENT
		))}
		type='button'
		value='decrease time'
	/><TaskList
		showInput={false}
	/></>;
}

export default AdjustTime;