import * as type from './type';
import * as state from '../constant/state';

import { updateLocalStorage } from '../util';

let moment = require('moment');

const initialState = {

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

		case type.ADD_TIME:
		case type.SET_ACTIVE:
			return updateLocalStorage({
				...currentState,
				taskList: currentState.taskList.map(task => {
					let selectedTask = task.name === action.taskName;
					let previouslyActive = task.active;
					let currentlyActive = {
						[type.ADD_TIME]: task.active,
						[type.SET_ACTIVE]: selectedTask
					}[action.type];
					let now = moment();
					let updatedDateTime = currentlyActive ? now : null;
					let count = task.count;
					if (previouslyActive) {
						count += now.diff(task.updatedDateTime);
					}
					if (action.timeBegin && action.timeEnd && selectedTask) {
						let timeBegin = moment(action.timeBegin, 'HH:mm', true);
						let timeEnd = moment(action.timeEnd, 'HH:mm', true);
						if (timeBegin.isValid() && timeEnd.isValid()) {
							count += timeEnd.diff(timeBegin);
						}
					}
					return {
						...task,
						active: currentlyActive,
						count,
						updatedDateTime
					};
				})
			});

		case type.CLEAR_LOCAL_STORAGE:
			localStorage.clear();
			return initialState;

		case type.NAVIGATION:
			return updateLocalStorage({
				...currentState,
				state: action.state
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem('state')) || initialState;

		default: return currentState;
	}
};

export default reducer;
