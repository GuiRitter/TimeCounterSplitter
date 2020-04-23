import React from 'react';
import { connect } from 'react-redux';
import * as action from './flux/action';

class Task extends React.Component {

	render() {
		return <tr><td>{
			this.props.task.name
		}</td><td>{
			this.props.task.active
				? 'active'
				: ''
		}</td><td><input
			onClick={() => this.props.setActive(this.props.task.name)}
			type='button'
			value='start'
		/></td></tr>;
	}
}

const mapDispatchToProps = dispatch => ({

	setActive: taskName => dispatch(action.setActive(taskName))
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(Task);
