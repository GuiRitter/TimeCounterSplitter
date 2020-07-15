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
			value='add'
		/><input
			onClick={() => this.props.clearFromLocalStorage()}
			type='button'
			value='clear storage'
		/></>;
	}
}

const mapDispatchToProps = dispatch => ({

	clearFromLocalStorage: () => dispatch(action.clearFromLocalStorage()),
	navigate: state => dispatch(action.navigate(state)),
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(ActionMenu);
