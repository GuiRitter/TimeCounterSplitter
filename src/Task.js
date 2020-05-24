import React from 'react';
import { connect } from 'react-redux';

import { buildCell, buildRow, round } from './util';

import * as action from './flux/action';
import { getCountSum } from './selector'

let moment = require('moment');

class Task extends React.Component {

	buildKey = key => `task_${this.props.task.name}_${key}`;

	render() {
		let count = moment.duration(this.props.task.count).asHours();

		let proportional = ((8.8 * this.props.task.count) / (this.props.countSum || 0)) || 0;

		return buildRow(
			buildCell(this.buildKey('start'), <input
				onClick={() => this.props.setActive(this.props.task.name)}
				type='button'
				value='start'
			/>),
			buildCell(this.buildKey('name'), this.props.task.name),
			buildCell(this.buildKey('active'), this.props.task.active
				? 'active'
				: ''),
			buildCell(this.buildKey('count'), round(count, 1), { title: count }),
			buildCell(this.buildKey('proportional'), round(proportional, 1), { title: proportional }),
			buildCell(this.buildKey('addTime'), <input
				onClick={() => this.props.addTime(
					this.props.task.name,
					this.props.timeBeginField.value,
					this.props.timeEndField.value)}
				type='button'
				value='add time'
			/>)
		);
	}
}

const mapStateToProps = state => ({

	countSum: getCountSum(state)
});

const mapDispatchToProps = dispatch => ({

	addTime: (taskName, timeBegin, timeEnd) => dispatch(action.addTime(taskName, timeBegin, timeEnd)),
	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Task);
