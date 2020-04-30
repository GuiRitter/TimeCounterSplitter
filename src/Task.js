import React from 'react';
import { connect } from 'react-redux';

import { buildCell, buildRow, round } from './util';

import * as action from './flux/action';

let moment = require('moment');

class Task extends React.Component {

	buildKey = key => `task_${this.props.task.name}_${key}`;

	render() {
		let count = moment.duration(this.props.task.count).asHours();

		let proportional = ((8.8 * this.props.task.count) / (this.props.countSum || 0)) || 0;

		return buildRow(
			buildCell(this.buildKey('button'), <input
				onClick={() => this.props.setActive(this.props.task.name)}
				type='button'
				value='start'
			/>),
			buildCell(this.buildKey('name'), this.props.task.name),
			buildCell(this.buildKey('active'), this.props.task.active
				? 'active'
				: ''),
			buildCell(this.buildKey('count'), round(count, 1), { title: count }),
			buildCell(this.buildKey('proportional'), round(proportional, 1), { title: proportional })
		);
	}
}

const mapStateToProps = state => ({

	countSum: state.reducer.countSum
});

const mapDispatchToProps = dispatch => ({

	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Task);
