import * as type from './type';
import * as operation from '../constant/operation';
import * as state from '../constant/state';

import { updateLocalStorage } from '../util';

let moment = require('moment');

const initialState = {

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
					name: action.newTaskName
				}].filter(newTask => currentState.taskList.every(task => newTask.name !== task.name)))
			});

		case type.ADJUST_TIME:
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
					if (previouslyActive) {
						count += now.diff(task.updatedDateTime);
						if (!currentlyActive) {
							lastStoppedDateTime = now.format('HH:mm');
						}
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
					return {
						...task,
						active: currentlyActive,
						count,
						updatedDateTime,
						lastStoppedDateTime
					};
				})
			});

		case type.CLEAR_LOCAL_STORAGE:
			localStorage.clear();
			return initialState;

		case type.NAVIGATION:
			return updateLocalStorage({
				...currentState,
				state: action.state,
				selectedTask: action.selectedTask
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem('state')) || initialState;

		default: return currentState;
	}
};

export default reducer;
