import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

class TaskActionMenu extends React.Component {

	render() {
		return <><h1>{`actions for task ${this.props.selectedTask}`}</h1><input
			onClick={() => this.props.navigate(state.TASK_LIST)}
			type='button'
			value='back'
		/><input
			onClick={() => this.props.navigate(state.TASK_ADJUST_TIME, this.props.selectedTask)}
			type='button'
			value='adjust time'
		/></>;
	}
}

const mapStateToProps = state => ({

	selectedTask: state.reducer.selectedTask
});

const mapDispatchToProps = dispatch => ({

	navigate: (state, selectedTask) => dispatch(action.navigate(state, selectedTask)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TaskActionMenu);
