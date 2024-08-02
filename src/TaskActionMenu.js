import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';

import { ignoreRegardTask, navigate, removeTask } from './flux/action';
import { getSelectedTask } from './flux/selector';

function TaskActionMenu(props) {

	const dispatch = useDispatch();

	const selectedTask = useSelector(getSelectedTask) || {};

	return <><h1>{`actions for task ${selectedTask.name}`}</h1><input
		onClick={() => dispatch(navigate(state.TASK_LIST))}
		type='button'
		value='back'
	/><input
		onClick={() => dispatch(navigate(state.TASK_ADJUST_TIME, selectedTask.name))}
		type='button'
		value='adjust time'
	/><input
		onClick={() => dispatch(navigate(state.TASK_CHANGE_NAME, selectedTask.name))}
		type='button'
		value='change name'
	/><input
		onClick={() => dispatch(navigate(state.TASK_CHANGE_OBSERVATION, selectedTask.name))}
		type='button'
		value='change observation'
	/><input
		onClick={() => dispatch(ignoreRegardTask(selectedTask.name))}
		type='button'
		value={selectedTask.ignored ? 'regard' : 'ignore'}
	/><input
		onClick={() => dispatch(removeTask(selectedTask.name))}
		type='button'
		value='remove'
	/></>;
}

export default TaskActionMenu;
