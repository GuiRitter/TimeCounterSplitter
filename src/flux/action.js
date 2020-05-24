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

export const setActive = taskName => ({
	type: type.SET_ACTIVE,
	taskName
});
