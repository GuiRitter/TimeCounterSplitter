import * as type from './type';

export const addTask = newTaskName => dispatch => {
    dispatch({
        type: type.ADD_TASK,
        newTaskName
    });
};
