import * as type from './type';

let moment = require('moment');

const initialState = {

	taskList: []
};

const reducer = (state = initialState, action) => {

	switch (action.type) {

		case type.ADD_TASK:
			if ((!action.newTaskName) || (!(action.newTaskName.trim()))) {
				return state;
			}
			return {
				...state,
				taskList: state.taskList.concat([{
					count: 0,
					name: action.newTaskName
				}].filter(newTask => state.taskList.every(task => newTask.name !== task.name)))
			};

		case type.SET_ACTIVE:
			return {
				...state,
				taskList: state.taskList.map(task => {
					let previouslyActive = task.active;
					let currentlyActive = task.name === action.taskName;
					let now = moment();
					let updatedDateTime = currentlyActive ? now : null;
					let count = task.count;
					if (previouslyActive) {
						count += now.diff(task.updatedDateTime);
					}
					return {
						...task,
						active: currentlyActive,
						count,
						updatedDateTime
					};
				})
			};

		default: return state;
	}
};

export default reducer;
