import { createSelector } from 'reselect';

const getTaskList = state => state.reducer.taskList || [];

export const getCountSum = createSelector(
	[getTaskList],
	taskList => (taskList || [])
		.reduce((previousSum, currentTask) => previousSum + currentTask.count, 0)
);

export const getTaskListProportional = createSelector(
	[getTaskList, getCountSum],
	(taskList, countSum) => (taskList || []).map(task => ({
		name: task.name,
		proportional: ((8.8 * (task.count || 0)) / (countSum || 0)) || 0
	}))
);

export const isAnyActive = createSelector(
	[getTaskList],
	taskList => (taskList || [])
		.reduce((previousBoolean, currentTask) => previousBoolean || currentTask.active, false)
);
