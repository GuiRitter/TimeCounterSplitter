import React from 'react';
import { connect } from 'react-redux';

import * as action from '../action';

class CountSumBinder extends React.Component {

	componentDidUpdate(prevProps) {

		let countSum = (this.props.taskList || []).reduce((previousSum, currentTask) => previousSum + currentTask.count, 0);

		if (prevProps.countSum === countSum) {
			return;
		}
		this.props.updateCountSum(countSum);
	}

	render() {
		return <></>;
	}
}

const mapStateToProps = state => ({

	countSum: state.reducer.countSum,
	taskList: state.reducer.taskList
});

const mapDispatchToProps = dispatch => ({

	updateCountSum: countSum => dispatch(action.updateCountSum(countSum))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(CountSumBinder);
