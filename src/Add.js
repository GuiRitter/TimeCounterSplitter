import React from 'react';
import { useDispatch } from 'react-redux';

import * as state from './constant/state';

import { addTask, navigate } from './flux/action';

import { setRef } from './util/system';

let newTaskField = null;

function Add(props) {

	const dispatch = useDispatch();

	return <><input
		onClick={() => dispatch(navigate(state.ACTION_MENU))}
		type='button'
		value='cancel'
	/><input
		ref={setRef(ref => newTaskField = ref)}
	/><input
		onClick={() => dispatch(addTask(newTaskField.value))}
		type='button'
		value='add new task'
	/></>;
}

export default Add;
