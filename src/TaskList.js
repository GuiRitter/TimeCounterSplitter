import React from 'react';
import { connect } from 'react-redux';

import Task from './Task';

class TaskList extends React.Component {

	render() {
		return <table><tbody><tr><td></td><td></td><td><input
			onClick={() => alert('TO DO')}
			type='button'
			value='stop'
		/></td></tr>{(this.props.taskList || []).map(task => <Task
			task={task}
		/>)}</tbody></table>
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(TaskList);
