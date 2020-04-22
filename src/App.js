import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';

import TaskList from './TaskList';

class App extends React.Component {

	render() {
		return <>
			<input
				ref={ref => { if (ref) { this.newTaskField = ref; } }}
			/>
			<input
				onClick={() => this.props.addTask(this.newTaskField.value)}
				type='button'
				value='add'
			/>
			<TaskList/>
		</>
	}
}

const mapDispatchToProps = dispatch => ({

	addTask: taskName => dispatch(action.addTask(taskName))
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(App);
