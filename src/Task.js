import React from 'react';

export default class Task extends React.Component {

	render() {
		return <tr><td>{
			this.props.task.name
		}</td><td>{
			this.props.task.active
				? 'active'
				: ''
		}</td><td><input
			type='button'
			value='start'
		/></td></tr>;
	}
}
