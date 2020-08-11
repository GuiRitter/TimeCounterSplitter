import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

class ChangeName extends React.Component {

	render() {
		return <><h1>{`new name for task ${this.props.selectedTask}`}</h1><input
			onClick={() => this.props.navigate(state.TASK_ACTION_MENU, this.props.selectedTask)}
			type='button'
			value='back'
		/><input
			ref={ref => { if (ref) { this.nameField = ref; } }}
		/><input
			onClick={() => this.props.changeName(
				this.props.selectedTask,
				this.nameField.value
			)}
			type='button'
			value='change name'
		/></>;
	}
}

const mapStateToProps = state => ({

	selectedTask: state.reducer.selectedTask
});

const mapDispatchToProps = dispatch => ({

	changeName: (...args) => dispatch(action.changeName(...args)),
	navigate: (state, selectedTask) => dispatch(action.navigate(state, selectedTask))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ChangeName);
