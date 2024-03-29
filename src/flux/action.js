import * as state from '../constant/state';
import * as type from './type';
import { isNumberOrNumberAsString } from '../util/input';

export const adjustTime = (taskName, timeLeft, timeRight, operation) => ({
	type: type.ADJUST_TIME,
	operation,
	taskName,
	timeLeft,
	timeRight
});

export const addTask = newTaskName => dispatch => {
	dispatch({
		type: type.ADD_TASK,
		newTaskName
	});
	dispatch(navigate(state.TASK_LIST));
};

export const clearTaskCounts = () => {

	if (!window.confirm('sure?')) {
		return {
			type: type.NO_OP
		}
	}
	return {
		type: type.CLEAR_TASK_COUNTS
	};
};

export const clearFromLocalStorage = () => {

	if (!window.confirm('sure?')) {
		return {
			type: type.NO_OP
		}
	}
	return {
		type: type.CLEAR_LOCAL_STORAGE
	};
};

export const changeName = (taskName, newTaskName) => (dispatch, getState) => {
	
	let nameList = (((getState() || {}).reducer || {}).taskList || [])
		.map(task => task.name)
		.filter(name => name.localeCompare(taskName) !== 0);

	if (nameList.includes(newTaskName)) {
		alert(`there already exists a task called ${newTaskName}`);
		return;
	}

	dispatch({
		type: type.CHANGE_NAME,
		taskName,
		newTaskName
	});
	dispatch(navigate(state.TASK_LIST));
};

export const changeObservation = (taskName, newObservation) => dispatch => {
	
	dispatch({
		type: type.CHANGE_OBSERVATION,
		taskName,
		newObservation
	});
	dispatch(navigate(state.TASK_LIST));
};

export const ignoreRegardTask = taskName => dispatch => {
	dispatch({
		type: type.IGNORE_REGARD_TASK,
		taskName
	});
	dispatch(navigate(state.TASK_LIST));
};

export const navigate = (state, selectedTaskName) => ({
	type: type.NAVIGATION,
	state,
	selectedTaskName
});

export const removeTask = taskToBeRemovedName => dispatch => {

	if (!window.confirm('sure?')) {
		dispatch({
			type: type.NO_OP
		});
		return;
	}

	dispatch(navigate(state.TASK_LIST));

	dispatch({
		type: type.REMOVE_TASK,
		taskToBeRemovedName
	});
};

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setActive = taskName => ({
	type: type.SET_ACTIVE,
	taskName
});

export const setHoursPerDay = hoursPerDay => dispatch => {
	if (!isNumberOrNumberAsString(hoursPerDay)) {
		return;
	}
	dispatch({
		type: type.SET_HOURS_PER_DAY,
		hoursPerDay: parseFloat(hoursPerDay)
	});
};

export const showHideObservation = () => dispatch => {
	dispatch({
		type: type.SHOW_HIDE_OBSERVATION
	});
	dispatch(navigate(state.TASK_LIST));
};
