import * as type from './type';

export const addTask = newTaskName => dispatch => {
	dispatch({
		type: type.ADD_TASK,
		newTaskName
	});
};

export const setActive = taskName => dispatch => {
	dispatch({
		type: type.SET_ACTIVE,
		taskName
	});
};
