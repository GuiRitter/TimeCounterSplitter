import { createSelector } from 'reselect';

import { HOURS_PER_DAY } from '../constant/math';

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
		proportional: ((HOURS_PER_DAY * (task.count || 0)) / (countSum || 0)) || 0
	}))
);

export const getTaskName = (state, props) => ((props || {}).task || {}).name || "";

export const getTaskProportional = createSelector(
	[getTaskListProportional, getTaskName],
	(taskListProportional, taskName) => (taskListProportional || []).find(task => taskName === task.name)
);

export const isAnyActive = createSelector(
	[getTaskList],
	taskList => (taskList || [])
		.reduce((previousBoolean, currentTask) => previousBoolean || currentTask.active, false)
);
