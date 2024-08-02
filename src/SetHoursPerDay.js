import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HOURS_PER_DAY } from './constant/math';

import * as state from './constant/state';
import { navigate, setHoursPerDay } from './flux/action';

import { setRef } from './util/system';

let newHoursPerDayField = null;

function componentDidMount(props, hoursPerDay) {
	if (newHoursPerDayField) {
		newHoursPerDayField.value = hoursPerDay || HOURS_PER_DAY;
	}
}

function componentDidUpdate(props, prevProps, hoursPerDay, prevHoursPerDay) {
	if (prevHoursPerDay !== hoursPerDay) {
		alert(`hours per day changed from ${prevHoursPerDay} to ${hoursPerDay}`);
	}
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function SetHoursPerDay(props) {

	const didMountRef = useRef(false);

	const dispatch = useDispatch();

	const hoursPerDay = useSelector(state => ((state || {}).reducer || {}).hoursPerDay || 0) || 0;

	const { props: prevProps, hoursPerDay: prevHoursPerDay } = usePrevious({ props, hoursPerDay }) || {};

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, hoursPerDay, prevHoursPerDay);
		} else {
			didMountRef.current = true;
			componentDidMount(props, hoursPerDay);
		}
	});

	return <><input
		onClick={() => dispatch(navigate(state.ACTION_MENU))}
		type='button'
		value='cancel'
	/><input
		ref={setRef(ref => newHoursPerDayField = ref)}
	/><input
		onClick={() => dispatch(setHoursPerDay(newHoursPerDayField.value))}
		type='button'
		value='set hours per day'
	/></>;
}

export default SetHoursPerDay;
