import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';

import { buildCell, buildRow } from './util';

import Task from './Task';

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

		this.props.restoreFromLocalStorage();
	}

	render() {
		return <><table><tbody>{buildRow(
			buildCell('add', <input
				onClick={() => this.props.addTask(this.newTaskField.value)}
				type='button'
				value='add'
			/>),
			buildCell('name', <input
				ref={ref => { if (ref) { this.newTaskField = ref; } }}
			/>),
			buildCell('active'),
			buildCell('count', <input
				ref={ref => { if (ref) { this.timeBeginField = ref; } }}
			/>),
			buildCell('proportional', <input
				ref={ref => { if (ref) { this.timeEndField = ref; } }}
			/>),
			buildCell('addTime')
		)}{buildRow(
			buildCell('stop', <input
				onClick={() => this.props.setActive('')}
				type='button'
				value='stop'
			/>),
			buildCell('name'),
			buildCell('active'),
			buildCell('count'),
			buildCell('proportional'),
			buildCell('addTime')
		)}{(this.props.taskList || []).map(task => <Task
			key={task.name}
			task={task}
			timeBeginField={this.timeBeginField}
			timeEndField={this.timeEndField}
		/>)}</tbody></table><input
		onClick={() => this.props.clearFromLocalStorage()}
			type='button'
			value='clear storage'
		/></>;
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	addTask: taskName => dispatch(action.addTask(taskName)),
	clearFromLocalStorage: () => dispatch(action.clearFromLocalStorage()),
	restoreFromLocalStorage: () => dispatch(action.restoredFromLocalStorage()),
	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App);
