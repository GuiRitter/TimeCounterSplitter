import * as type from './type';
import * as operation from '../constant/operation';
import * as state from '../constant/state';

import { HOURS_PER_DAY } from '../constant/math';
import { LOCAL_STORAGE_NAME } from '../constant/system';

import { updateLocalStorage } from '../util/persistence';

let moment = require('moment');

const initialState = {

	hoursPerDay: HOURS_PER_DAY,
	selectedTask: null,
	state: state.TASK_LIST,
	taskList: []
};

const reducer = (currentState = initialState, action) => {

	switch (action.type) {

		case type.ADD_TASK:
			if ((!(action.newTaskName)) || (!(action.newTaskName.trim()))) {
				return currentState;
			}
			return updateLocalStorage({
				...currentState,
				taskList: currentState.taskList.concat([{
					count: 0,
					ignored: false,
					name: action.newTaskName
				}].filter(newTask => currentState.taskList.every(task => newTask.name !== task.name)))
			});

		case type.ADJUST_TIME:
		case type.CHANGE_NAME:
		case type.SET_ACTIVE:
			return updateLocalStorage({
				...currentState,
				taskList: currentState.taskList.map(task => {
					let selectedTask = task.name === action.taskName;
					let previouslyActive = task.active;
					let currentlyActive = {
						[type.ADJUST_TIME]: task.active,
						[type.SET_ACTIVE]: selectedTask
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
					if (action.timeLeft && action.timeRight && selectedTask && action.operation) {
						let timeLeft = moment(action.timeLeft, 'HH:mm', true);
						let timeRight = moment(action.timeRight, 'HH:mm', true);
						if (timeLeft.isValid() && timeRight.isValid()) {
							let timeArray = [timeLeft, timeRight].sort();
							count += {
								[operation.INCREMENT]: timeArray[1].diff(timeArray[0]),
								[operation.DECREMENT]: timeArray[0].diff(timeArray[1])
							}[action.operation];
						}
					}
					let name = task.name;
					if (selectedTask && action.newTaskName && action.newTaskName.trim()) {
						name = action.newTaskName;
					}
					return {
						...task,
						active: currentlyActive,
						count,
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
			return updateLocalStorage({
				...currentState,
				state: action.state,
				selectedTask: action.selectedTask
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
