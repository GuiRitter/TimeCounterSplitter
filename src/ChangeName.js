import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';
import { getSelectedTask } from './selector/index';

class ChangeName extends React.Component {

	render() {
		return <><h1>{`new name for task ${this.props.selectedTask.name}`}</h1><input
			onClick={() => this.props.navigate(state.TASK_ACTION_MENU, this.props.selectedTask.name)}
			type='button'
			value='back'
		/><input
			ref={ref => { if (ref) { this.nameField = ref; } }}
		/><input
			onClick={() => this.props.changeName(
				this.props.selectedTask.name,
				this.nameField.value
			)}
			type='button'
			value='change name'
		/></>;
	}
}

const mapStateToProps = state => ({

	selectedTask: getSelectedTask(state)
});

const mapDispatchToProps = dispatch => ({

	changeName: (...args) => dispatch(action.changeName(...args)),
	navigate: (state, selectedTaskName) => dispatch(action.navigate(state, selectedTaskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ChangeName);
