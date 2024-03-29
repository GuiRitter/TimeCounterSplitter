import React from 'react';
import { connect } from 'react-redux';

import { buildCell, buildRow } from './util/html';
import { round } from './util/math';

import * as action from './flux/action';
import * as state from './constant/state';
import { getTaskProportionalRounded } from './selector'

let moment = require('moment');

class Task extends React.Component {

	buildKey = key => `task_${this.props.task.name}_${key}`;

	render() {
		let count = moment.duration(this.props.task.count).asHours();
		
		let proportional = (this.props.taskProportional || {}).proportional;

		return <>{buildRow(
			buildCell(this.buildKey('start'), (!this.props.showInput) ? null : <input
				onClick={() => this.props.setActive(this.props.task.name)}
				type='button'
				value='start'
			/>),
			buildCell(this.buildKey('name'), this.props.task.name),
			buildCell(this.buildKey('active'), this.props.task.active
				? 'active'
				: ''),
			buildCell(this.buildKey('count'), round(count, 1), { onClick: () => alert(count), title: count }),
			buildCell(this.buildKey('proportional'), this.props.task.ignored ? 'ignored' : round(proportional, 1), { onClick: () => alert(proportional), title: proportional }),
			buildCell(this.buildKey('lastStart'), this.props.task.lastStartedDateTime),
			buildCell(this.buildKey('lastStop'), this.props.task.lastStoppedDateTime),
			buildCell(this.buildKey('taskAction'), (!this.props.showInput) ? null : <input
				onClick={() => this.props.navigate(state.TASK_ACTION_MENU, this.props.task.name)}
				type='button'
				value='action'
			/>)
		)}{(this.props.observationVisible && this.props.task.observation) ? buildRow(buildCell('observation', this.props.task.observation, { colSpan: 8 })) : null}</>;
	}
}

const mapStateToProps = (state, props) => ({

	observationVisible: state.reducer.observationVisible,
	taskProportional: getTaskProportionalRounded(state, props)
});

const mapDispatchToProps = dispatch => ({

	navigate: (state, selectedTaskName) => dispatch(action.navigate(state, selectedTaskName)),
	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Task);
