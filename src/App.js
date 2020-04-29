import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';

import CountSumBinder from './flux/binder/CountSumBinder';

import TaskList from './TaskList';

class App extends React.Component {

	/**
	 * Prevents the tab from being closed accidentally.
	 * 
	 * [Source](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload).
	 */
	componentDidMount() {
		window.addEventListener('beforeunload', function (e) {
			// Cancel the event
			e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
			// Chrome requires returnValue to be set
			e.returnValue = '';
		});
	}

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
			<TaskList />
			<CountSumBinder />
		</>
	}
}

const mapDispatchToProps = dispatch => ({

	addTask: taskName => dispatch(action.addTask(taskName))
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(App);
