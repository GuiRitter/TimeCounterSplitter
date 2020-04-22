import React from 'react';
import { connect } from 'react-redux';

import Task from './Task';

class TaskList extends React.Component {

	render() {
		return <>
			<p>
				<input
					onClick={() => alert('TO DO')}
					type='button'
					value='stop'
				/>
			</p>
			{(this.props.taskList || []).map(task => <Task
				task={task}
			/>)}
		</>
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(TaskList);