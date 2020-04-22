import React from 'react';

export default class Task extends React.Component {

	render() {
		return <p>{
			this.props.task.name
		}&emsp;{
				this.props.task.active
					? 'active'
					: ''
			}&emsp;<input
				type='button'
				value='start'
			/></p>;
	}
}
