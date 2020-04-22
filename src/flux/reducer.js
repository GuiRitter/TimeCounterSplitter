import * as type from './type';

const initialState = {

	taskList: []
};

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case type.ADD_TASK:
			return {
				...state,
				taskList: state.taskList.concat([{
					name: action.newTaskName
				}].filter(newTask => state.taskList.every(task => newTask.name != task.name)))
			};
		default: return state;
	}
};

export default reducer;
