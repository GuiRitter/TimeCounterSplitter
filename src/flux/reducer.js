import * as type from './type';
import * as operation from '../constant/operation';
import * as state from '../constant/state';

import { HOURS_PER_DAY } from '../constant/math';
import { LOCAL_STORAGE_NAME } from '../constant/system';

import { updateLocalStorage } from '../util/persistence';

let moment = require('moment');

const initialState = {

	hoursPerDay: HOURS_PER_DAY,
	selectedTaskName: null,
	state: state.TASK_LIST,
	taskList: []
};

const reducer = (currentState = initialState, action) => {
	console.log((new Date()).toISOString(), 'reducer', { currentState, action });

	switch (action.type) {

		case type.ADD_TASK:
			if ((!(action.newTaskName)) || (!(action.newTaskName.trim()))) {
				return currentState;
			}
			return updateLocalStorage({
				...currentState,
				taskList: currentState.taskList.concat([{
					active: false,
					count: 0,
					ignored: false,
					lastStartedDateTime: null,
					lastStoppedDateTime: null,
					name: action.newTaskName,
					updatedDateTime: null
				}].filter(newTask => currentState.taskList.every(task => newTask.name !== task.name)))
			});

		case type.ADJUST_TIME:
		case type.CHANGE_NAME:
		case type.CLEAR_TASK_COUNTS:
		case type.IGNORE_REGARD_TASK:
		case type.REMOVE_TASK:
		case type.SET_ACTIVE:
			return updateLocalStorage({
				...currentState,
				taskList: currentState.taskList.filter(task => 
					(action.type !== type.REMOVE_TASK) || (task.name !== action.taskToBeRemovedName)
				).map(task => {
					let isSelectedTask = task.name === action.taskName;
					let previouslyActive = task.active;
					let currentlyActive = {
						[type.ADJUST_TIME]: task.active,
						[type.CHANGE_NAME]: task.active,
						[type.CLEAR_TASK_COUNTS]: task.active,
						[type.IGNORE_REGARD_TASK]: task.active,
						[type.SET_ACTIVE]: isSelectedTask
					}[action.type];
					let now = moment();
					let updatedDateTime = currentlyActive ? now : null;
					let count = task.count;
					let lastStoppedDateTime = task.lastStoppedDateTime;
					let lastStartedDateTime = task.lastStartedDateTime;
					if (previouslyActive) {
						count += now.diff(task.updatedDateTime);
						if (!currentlyActive) {
							lastStoppedDateTime = now.format('HH:mm');
						}
					} else if (currentlyActive) {
						lastStartedDateTime = now.format('HH:mm');
					}
					if (action.timeLeft && action.timeRight && isSelectedTask && action.operation) {
						let timeLeft = moment(action.timeLeft, 'HH:mm', true);
						let timeRight = moment(action.timeRight, 'HH:mm', true);
						if (timeLeft.isValid() && timeRight.isValid()) {
							let timeArray = [timeLeft, timeRight].sort();
							let timeDiff = {
								[operation.INCREMENT]: timeArray[1].diff(timeArray[0]),
								[operation.DECREMENT]: timeArray[0].diff(timeArray[1])
							}[action.operation];
							count = ((action.operation === operation.DECREMENT) && ((-timeDiff) > count)) ? 0 : (count + timeDiff);
						}
					}
					else if (action.type === type.CLEAR_TASK_COUNTS) {
						count = 0;
					}
					let name = task.name;
					if (isSelectedTask && action.newTaskName && action.newTaskName.trim()) {
						name = action.newTaskName;
					}
					let ignored = task.ignored;
					if (isSelectedTask && (action.type === type.IGNORE_REGARD_TASK)) {
						ignored = !ignored;
					}
					return {
						...task,
						active: currentlyActive,
						count,
						ignored,
						name,
						updatedDateTime,
						lastStartedDateTime,
						lastStoppedDateTime
					};
				})
			});

		case type.CLEAR_LOCAL_STORAGE:
			localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(initialState));
			return initialState;

		case type.NAVIGATION:
			let selectedTaskName = action.selectedTaskName || null;
			return updateLocalStorage({
				...currentState,
				state: action.state,
				selectedTaskName
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		case type.SET_HOURS_PER_DAY:
			return updateLocalStorage({
				...currentState,
				hoursPerDay: action.hoursPerDay
			});

		default: return currentState;
	}
};

export default reducer;
