import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';
import { getSelectedTask } from './selector/index';

class ChangeObservation extends React.Component {

	componentDidMount() {

		if (this.observationField) {
			this.observationField.value = (this.props.selectedTask || {}).observation || '';
		}
	}

	render() {
		return <><h1>{`new observation for task ${this.props.selectedTask.name}`}</h1><input
			onClick={() => this.props.navigate(state.TASK_ACTION_MENU, this.props.selectedTask.name)}
			type='button'
			value='back'
		/><input
			ref={ref => { if (ref) { this.observationField = ref; } }}
		/><input
			onClick={() => this.props.changeObservation(
				this.props.selectedTask.name,
				this.observationField.value
			)}
			type='button'
			value='change observation'
		/></>;
	}
}

const mapStateToProps = state => ({

	selectedTask: getSelectedTask(state)
});

const mapDispatchToProps = dispatch => ({

	changeObservation: (...args) => dispatch(action.changeObservation(...args)),
	navigate: (state, selectedTaskName) => dispatch(action.navigate(state, selectedTaskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ChangeObservation);
