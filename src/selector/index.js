import { createSelector } from 'reselect';

import { HOURS_PER_DAY } from '../constant/math';
import { round } from '../util';

const getHoursPerDay = state => state.reducer.hoursPerDay || HOURS_PER_DAY;

const getTaskList = state => state.reducer.taskList || [];

export const getCountSum = createSelector(
	[getTaskList],
	taskList => (taskList || [])
		.reduce((previousSum, currentTask) => previousSum + currentTask.count, 0)
);

export const getTaskListProportional = createSelector(
	[getTaskList, getCountSum, getHoursPerDay],
	(taskList, countSum, hoursPerDay) => (taskList || []).map(task => ({
		name: task.name,
		proportional: ((hoursPerDay * (task.count || 0)) / (countSum || 0)) || 0
	}))
);

export const getTaskName = (state, props) => ((props || {}).task || {}).name || "";

export const getTaskProportional = createSelector(
	[getTaskListProportional, getTaskName],
	(taskListProportional, taskName) => (taskListProportional || []).find(task => taskName === task.name)
);

/**
 * The idea was to use
 * https://stackoverflow.com/a/17641358/1781376
 * but it was not necessary.
 * It was a good source of inspiration, though.
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
			taskList = taskList.sort(
				(firstEl, secondEl) => (firstEl.proportional < secondEl.proportional) ? -1 : (firstEl.proportional > secondEl.proportional) ? 1 : 0
			);
			let smallest = taskList[0];
			let taskListRest = taskList
				.slice(1)
				.map(task => ({
					...task,
					proportional: round(task.proportional, 1)
				}));
			smallest.proportional = taskListRest.reduce((previousSum, currentTask) => previousSum - currentTask.proportional, hoursPerDay);
			taskList = taskListRest.concat(smallest)
			console.log(JSON.stringify(taskList));
		}
		return taskList;
	}
);

export const getTaskProportionalRounded = createSelector(
	[getTaskListProportionalRounded, getTaskName],
	(taskListProportionalRounded, taskName) => (taskListProportionalRounded || []).find(task => taskName === task.name)
);

export const isAnyActive = createSelector(
	[getTaskList],
	taskList => (taskList || [])
		.reduce((previousBoolean, currentTask) => previousBoolean || currentTask.active, false)
);
