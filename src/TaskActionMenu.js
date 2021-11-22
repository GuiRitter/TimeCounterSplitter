import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';
import { getSelectedTask } from './selector/index';

class TaskActionMenu extends React.Component {

	render() {
		return <><h1>{`actions for task ${this.props.selectedTask.name}`}</h1><input
			onClick={() => this.props.navigate(state.TASK_LIST)}
			type='button'
			value='back'
		/><input
			onClick={() => this.props.navigate(state.TASK_ADJUST_TIME, this.props.selectedTask.name)}
			type='button'
			value='adjust time'
		/><input
			onClick={() => this.props.navigate(state.TASK_CHANGE_NAME, this.props.selectedTask.name)}
			type='button'
			value='change name'
		/><input
			onClick={() => this.props.ignoreRegardTask(this.props.selectedTask.name)}
			type='button'
			value={this.props.selectedTask.ignored ? 'regard' : 'ignore'}
		/><input
			onClick={() => this.props.removeTask(this.props.selectedTask.name)}
			type='button'
			value={'remove'}
		/></>;
	}
}

const mapStateToProps = state => ({

	selectedTask: getSelectedTask(state)
});

const mapDispatchToProps = dispatch => ({

	ignoreRegardTask: taskName => dispatch(action.ignoreRegardTask(taskName)),
	navigate: (state, selectedTaskName) => dispatch(action.navigate(state, selectedTaskName)),
	removeTask: (selectedTaskName) => dispatch(action.removeTask(selectedTaskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TaskActionMenu);
