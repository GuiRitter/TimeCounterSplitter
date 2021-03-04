import React from 'react';
import { connect } from 'react-redux';

import { HOURS_PER_DAY } from './constant/math';

import * as action from './flux/action';
import * as state from './constant/state';

class SetHoursPerDay extends React.Component {

	componentDidMount() {
		this.newHoursPerDayField.value = this.props.hoursPerDay || HOURS_PER_DAY;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.hoursPerDay !== this.props.hoursPerDay) {
			alert(`hours per day changed from ${prevProps.hoursPerDay} to ${this.props.hoursPerDay}`);
		}
	}

	render() {
		return <><input
			onClick={() => this.props.navigate(state.ACTION_MENU)}
			type='button'
			value='cancel'
		/><input
			ref={ref => { if (ref) { this.newHoursPerDayField = ref; } }}
		/><input
			onClick={() => this.props.setHoursPerDay(this.newHoursPerDayField.value)}
			type='button'
			value='set hours per day'
		/></>;
	}
}

const mapStateToProps = state => ({

	hoursPerDay: state.reducer.hoursPerDay,
	state: state.reducer.state
});

const mapDispatchToProps = dispatch => ({

	setHoursPerDay: hoursPerDayField => dispatch(action.setHoursPerDay(hoursPerDayField)),
	navigate: state => dispatch(action.navigate(state))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SetHoursPerDay);
