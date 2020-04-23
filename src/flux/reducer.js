import * as type from './type';

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
					name: action.newTaskName
				}].filter(newTask => state.taskList.every(task => newTask.name !== task.name)))
			};

		case type.SET_ACTIVE:
			return {
				...state,
				taskList: state.taskList.map(task => ({
					...task,
					active: task.name === action.taskName
				}))
			};

		default: return state;
	}
};

export default reducer;
