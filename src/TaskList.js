import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

import { buildCell, buildRow } from './util';

import Task from './Task';

class taskList extends React.Component {

	render() {
		return <><table><tbody>{(!this.props.showInput) ? null : buildRow(
			buildCell('stop', <input
				onClick={this.props.setActive}
				type='button'
				value='stop'
			/>),
			buildCell('name', 'name'),
			buildCell('active'),
			buildCell('count', 'count'),
			buildCell('proportional', 'ratio'),
			buildCell('action')
		)}{(this.props.taskList || []).map(task => <Task
			key={task.name}
			showInput={this.props.showInput}
			task={task}
			timeBeginField={this.timeBeginField}
			timeEndField={this.timeEndField}
		/>)}</tbody></table>{(!this.props.showInput) ? null : <input
		onClick={() => this.props.navigate(state.ACTION_MENU)}
			type='button'
			value='actions'
		/>}</>;
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	navigate: state => dispatch(action.navigate(state)),
	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(taskList);
