import * as type from './type';

export const addTime = (taskName, timeBegin, timeEnd) => ({
	type: type.ADD_TIME,
	taskName,
	timeBegin,
	timeEnd
});

export const addTask = newTaskName => ({
	type: type.ADD_TASK,
	newTaskName
});

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

export const navigate = state => ({
	type: type.NAVIGATION,
	state
});

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setActive = taskName => ({
	type: type.SET_ACTIVE,
	taskName
});
