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

export const changeName = (taskName, newTaskName) => dispatch => {
	dispatch({
		type: type.CHANGE_NAME,
		taskName,
		newTaskName
	});
	dispatch(navigate(state.TASK_LIST));
};

export const navigate = (state, selectedTask) => ({
	type: type.NAVIGATION,
	state,
	selectedTask
});

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
