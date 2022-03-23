import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

class ActionMenu extends React.Component {

	render() {
		return <><input
			onClick={() => this.props.navigate(state.TASK_LIST)}
			type='button'
			value='back'
		/><input
			onClick={() => this.props.navigate(state.ACTION_ADD)}
			type='button'
			value='add new task'
		/><input
			onClick={() => this.props.clearTaskCounts()}
			type='button'
			value='clear times'
		/><input
			onClick={() => this.props.clearFromLocalStorage()}
			type='button'
			value='clear storage'
		/><input
			onClick={() => this.props.navigate(state.ACTION_SET_HOURS_PER_DAY)}
			type='button'
			value='set hours per day'
		/><input
			onClick={() => this.props.showHideObservation()}
			type='button'
			value={`${this.props.observationVisible ? 'hide' : 'show'} observations`}
		/></>;
	}
}

const mapStateToProps = (state, props) => ({

	observationVisible: state.reducer.observationVisible
});

const mapDispatchToProps = dispatch => ({

	clearFromLocalStorage: () => dispatch(action.clearFromLocalStorage()),
	clearTaskCounts: () => dispatch(action.clearTaskCounts()),
	navigate: state => dispatch(action.navigate(state)),
	showHideObservation: () => dispatch(action.showHideObservation())
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ActionMenu);
