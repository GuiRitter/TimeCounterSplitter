import React from 'react';
import { connect } from 'react-redux';
import * as action from './flux/action';

import { buildCell, buildRow } from './util';

import Task from './Task';

class TaskList extends React.Component {

	render() {
		return <table><tbody>{buildRow(
			buildCell('stop', <input
				onClick={() => this.props.setActive('')}
				type='button'
				value='stop'
			/>),
			buildCell('name'),
			buildCell('active'),
			buildCell('count'),
		)}{(this.props.taskList || []).map(task => <Task
			key={task.name}
			task={task}
		/>)}</tbody></table>
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TaskList);
