import { createSelector } from '@reduxjs/toolkit';

import { HOURS_PER_DAY } from '../constant/math';
import { floor } from '../util/math';

/**
 * @param {*} state 
 */
const getHoursPerDay = state => state.reducer.hoursPerDay || HOURS_PER_DAY;

/**
 * @param {*} state 
 */
const getTaskList = state => state.reducer.taskList || [];

/**
 * @param {*} state 
 */
const getRegardedTaskList = state => (state.reducer.taskList || []).filter(task => !task.ignored);

/**
 * @param {*} state 
 */
export const getRegardedCountSum = createSelector(
	[getRegardedTaskList],
	taskList => (taskList || [])
		.reduce((previousSum, currentTask) => previousSum + currentTask.count, 0)
);

/**
 * @param {*} state 
 */
export const getTaskListProportional = createSelector(
	[getRegardedTaskList, getRegardedCountSum, getHoursPerDay],
	(taskList, countSum, hoursPerDay) => (taskList || []).map(task => ({
		name: task.name,
		proportional: ((hoursPerDay * (task.count || 0)) / (countSum || 0)) || 0
	}))
);

/**
 * @param {*} state 
 * @param {*} props 
 */
export const getTaskName = (state, props) => ((props || {}).task || {}).name || "";

/**
 * @param {*} state 
 * @param {*} props 
 */
export const getTaskProportional = createSelector(
	[getTaskListProportional, getTaskName],
	(taskListProportional, taskName) => (taskListProportional || []).find(task => taskName === task.name)
);

/**
 * The idea was to use
 * https://stackoverflow.com/a/17641358/1781376
 * but it was not necessary.
 * It was a good source of inspiration, though.
 * @param {*} state 
 */
export const getTaskListProportionalRounded = createSelector(
	[getTaskListProportional, getHoursPerDay],
	(taskList, hoursPerDay) => {
		taskList = (taskList || []);
		if (taskList.length < 1) {
			return taskList;
		} else if (taskList.length < 2) {
			return [{
				name: taskList[0].name,
				proportional: hoursPerDay
			}];
		} else {
			taskList = taskList.map(task => ({
				...task,
				proportionalFloored: floor(task.proportional, 1)
			}));
			let remainder = taskList.reduce((previousRemainder, currentTask) => previousRemainder - currentTask.proportionalFloored, hoursPerDay);
			taskList = taskList.sort((taskA, taskB) => (taskB.proportional - taskB.proportionalFloored) - (taskA.proportional - taskA.proportionalFloored));
			taskList = taskList.reduce((previousObject, currentTask) => ({ 
				remainder: Math.max(0, previousObject.remainder - 0.1),
				taskList: previousObject.taskList.concat({
					...currentTask,
					proportional: currentTask.proportionalFloored + Math.min(0.1, previousObject.remainder)
				})
			}), { remainder, taskList: [] }).taskList;
		}
		return taskList;
	}
);

/**
 * @param {*} state 
 * @param {*} props 
 */
export const getTaskProportionalRounded = createSelector(
	[getTaskListProportionalRounded, getTaskName],
	(taskListProportionalRounded, taskName) => (taskListProportionalRounded || []).find(task => taskName === task.name)
);

/**
 * @param {*} state 
 */
export const isAnyActive = createSelector(
	[getTaskList],
	taskList => (taskList || [])
		.reduce((previousBoolean, currentTask) => previousBoolean || currentTask.active, false)
);

/**
 * @param {*} state 
 */
const getSelectedTaskName = state => state.reducer.selectedTaskName || '';

/**
 * @param {*} state 
 */
export const getSelectedTask = createSelector(
	[getSelectedTaskName, getTaskList],
	(selectedTaskName, taskList) => (taskList || []).find(task => (selectedTaskName || '') === task.name)
);
