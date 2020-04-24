import React from 'react';
import { connect } from 'react-redux';
import * as action from './flux/action';

import Task from './Task';

class TaskList extends React.Component {

	render() {
		return <table><tbody><tr><td><input
			onClick={() => this.props.setActive('')}
			type='button'
			value='stop'
		/></td><td></td><td></td><td></td></tr>{(this.props.taskList || []).map(task => <Task
			key={task.name}
			task={task}
		/>)}</tbody></table>
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TaskList);
