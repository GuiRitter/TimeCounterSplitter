import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

class Add extends React.Component {

	render() {
		return <><input
			onClick={() => this.props.navigate(state.ACTION_MENU)}
			type='button'
			value='cancel'
		/><input
			ref={ref => { if (ref) { this.newTaskField = ref; } }}
		/><input
			onClick={() => this.props.addTask(this.newTaskField.value)}
			type='button'
			value='add new task'
		/></>;
	}
}

const mapStateToProps = state => ({

	state: state.reducer.state
});

const mapDispatchToProps = dispatch => ({

	addTask: taskName => dispatch(action.addTask(taskName)),
	navigate: state => dispatch(action.navigate(state))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Add);
