import React from 'react';
import { connect } from 'react-redux';

class TaskList extends React.Component {

	render() {
		return <>
			{(this.props.taskList || []).map(task => <p>{task.name}</p>)}
		</>
	}
}

const mapStateToProps = state => ({

	taskList: state.reducer.taskList
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(TaskList);