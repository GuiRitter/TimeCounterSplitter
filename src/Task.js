import React from 'react';
import { connect } from 'react-redux';

import { round } from './util';

import * as action from './flux/action';

let moment = require('moment');

class Task extends React.Component {

	render() {
		let count = moment.duration(this.props.task.count).asHours();

		return <tr><td><input
			onClick={() => this.props.setActive(this.props.task.name)}
			type='button'
			value='start'
		/></td><td>{
			this.props.task.name
		}</td><td>{
			this.props.task.active
				? 'active'
				: ''
		}</td><td title={count}>{
			round(count, 1)
		}</td></tr>;
	}
}

const mapDispatchToProps = dispatch => ({

	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(Task);
