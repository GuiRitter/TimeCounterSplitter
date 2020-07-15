import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

import { buildCell, buildRow } from './util';

import Task from './Task';

class taskList extends React.Component {

	render() {
		return <><table><tbody>{buildRow(
			buildCell('add'),
			buildCell('name'),
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
				onClick={this.props.setActive}
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
		onClick={() => this.props.navigate(state.ACTION_MENU)}
			type='button'
			value='actions'
		/></>;
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	addTask: taskName => dispatch(action.addTask(taskName)),
	navigate: state => dispatch(action.navigate(state)),
	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(taskList);
