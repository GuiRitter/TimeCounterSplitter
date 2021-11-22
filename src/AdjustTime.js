import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as operation from './constant/operation';
import * as state from './constant/state';
import { getSelectedTask } from './selector/index';

import TaskList from './TaskList';

class AdjustTime extends React.Component {

	render() {
		return <><h1>{`adjust task ${this.props.selectedTask.name}'s time`}</h1><input
			onClick={() => this.props.navigate(state.TASK_ACTION_MENU, this.props.selectedTask.name)}
			type='button'
			value='back'
		/><input
			onClick={() => {
				this.timeLeftField.value = '';
				this.timeRightField.value = '';
			}}
			type='button'
			value='clear'
		/><input
			ref={ref => { if (ref) { this.timeLeftField = ref; } }}
		/><input
			ref={ref => { if (ref) { this.timeRightField = ref; } }}
		/><input
			onClick={() => this.props.adjustTime(
				this.props.selectedTask.name,
				this.timeLeftField.value,
				this.timeRightField.value,
				operation.INCREMENT
			)}
			type='button'
			value='increase time'
		/><input
			onClick={() => this.props.adjustTime(
				this.props.selectedTask.name,
				this.timeLeftField.value,
				this.timeRightField.value,
				operation.DECREMENT
			)}
			type='button'
			value='decrease time'
		/><TaskList
			showInput={false}
		/></>;
	}
}

const mapStateToProps = state => ({

	state: state.reducer.state,
	selectedTask: getSelectedTask(state)
});

const mapDispatchToProps = dispatch => ({

	addTask: taskName => dispatch(action.addTask(taskName)),
	adjustTime: (...args) => dispatch(action.adjustTime(...args)),
	navigate: (state, selectedTaskName) => dispatch(action.navigate(state, selectedTaskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AdjustTime);
