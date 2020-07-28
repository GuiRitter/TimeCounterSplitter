import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';
import { isAnyActive } from './selector'

import Add from './Add';
import ActionMenu from './ActionMenu';
import AdjustTime from './AdjustTime';
import TaskList from './TaskList';
import TaskActionMenu from './TaskActionMenu';

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

		setTimeout(() => {
			this.componentDidUpdate();
		}, 0);
	}

	componentDidUpdate() {
		if (this.props.isAnyActive) {
			document.title = 'active · Time Counter Splitter';
		} else {
			document.title = 'stopped · Time Counter Splitter';
		}
	}

	render() {
		switch (this.props.state || state.TASK_LIST) {
			case state.ACTION_ADD: return <Add/>;
			case state.ACTION_MENU: return <ActionMenu/>;
			case state.TASK_ACTION_MENU: return <TaskActionMenu/>;
			case state.TASK_ADJUST_TIME: return <AdjustTime/>;
			case state.TASK_LIST: return <TaskList
				showInput={true}
			/>;
			default: return null;
		}
	}
}

const mapStateToProps = state => ({

	isAnyActive: isAnyActive(state),
	state: state.reducer.state
});

const mapDispatchToProps = dispatch => ({

	restoreFromLocalStorage: () => dispatch(action.restoreFromLocalStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App);
