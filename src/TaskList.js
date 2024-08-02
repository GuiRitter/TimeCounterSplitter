import React from 'react';
import { connect } from 'react-redux';

import * as action from './flux/action';
import * as state from './constant/state';

import { buildCell, buildRow } from './util/html';
import { round } from './util/math';

import Task from './Task';

let moment = require('moment');

class taskList extends React.Component {

	render() {

		const countSum = (this.props.taskList || []).reduce((previousSum, currentTask) => previousSum + moment.duration((currentTask || {}).count || 0).asHours(), 0);

		const countSumFormula = (this.props.taskList || [])
			.map(task => moment.duration((task || {}).count || 0).asHours())
			.join(' + ');

		return <><table><tbody>{(!this.props.showInput) ? null : buildRow(
			buildCell('stop', <input
				onClick={() => this.props.setActive(null)}
				type='button'
				value='stop'
			/>),
			buildCell('name', 'name'),
			buildCell('active'),
			buildCell('count', 'count'),
			buildCell('proportional', 'ratio'),
			buildCell('lastStart', 'last start'),
			buildCell('lastStop', 'last stop'),
			buildCell('action', (!this.props.showInput) ? null : <input
				onClick={() => this.props.navigate(state.ACTION_MENU)}
				type='button'
				value='actions'
			/>)
		)}{(this.props.taskList || []).map(task => <Task
			key={task.name}
			showInput={this.props.showInput}
			task={task}
			timeBeginField={this.timeBeginField}
			timeEndField={this.timeEndField}
		/>)}{buildRow(
			buildCell('hoursPerDay', `count sum: ${round(countSum, 2)} — hours per day: ${this.props.hoursPerDay}`, { colSpan: 8, onClick: () => alert(countSumFormula) })
		)}</tbody></table></>;
	}
}

const mapStateToProps = state => ({

	hoursPerDay: state.reducer.hoursPerDay,
	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	navigate: state => dispatch(action.navigate(state)),
	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(taskList);
