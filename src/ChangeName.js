import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';

import { changeName, navigate } from './flux/action';
import { getSelectedTask } from './flux/selector';

import { setRef } from './util/system';

let nameField = null;

function ChangeName(props) {

	const selectedTask = useSelector(getSelectedTask);

	const dispatch = useDispatch();

	return <><h1>{`new name for task ${selectedTask.name}`}</h1><input
		onClick={() => dispatch(navigate(state.TASK_ACTION_MENU, selectedTask.name))}
		type='button'
		value='back'
	/><input
		ref={setRef(ref => nameField = ref)}
	/><input
		onClick={() => dispatch(changeName(
			selectedTask.name,
			nameField.value
		))}
		type='button'
		value='change name'
	/></>;
}

export default ChangeName;
