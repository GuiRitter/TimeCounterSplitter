import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';

import { restoreFromLocalStorage } from './flux/action';
import * as selector from './flux/selector';

import ActionMenu from './ActionMenu';
import Add from './Add';
import AdjustTime from './AdjustTime';
import ChangeName from './ChangeName';
import ChangeObservation from './ChangeObservation';
import SetHoursPerDay from './SetHoursPerDay';
import TaskActionMenu from './TaskActionMenu';
import TaskList from './TaskList';

import './App.css';

function componentDidMount(props, dispatch, isAnyActive) {
	window.addEventListener('beforeunload', function (e) {
		// Cancel the event
		e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
		// Chrome requires returnValue to be set
		e.returnValue = '';
	});

	dispatch(restoreFromLocalStorage());

	setTimeout(() => componentDidUpdate(props, null, isAnyActive), 0);
}

function componentDidUpdate(props, prevProps, isAnyActive) {
	if (isAnyActive) {
		document.title = 'active · Time Counter Splitter';
	} else {
		document.title = 'stopped · Time Counter Splitter';
	}
}

function App(props) {

	const didMountRef = useRef(false);

	const currentState = useSelector(state => ((state || {}).reducer || {}).state);
	const isAnyActive = useSelector(selector.isAnyActive);
	
	const dispatch = useDispatch();

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, null, isAnyActive);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, isAnyActive);
		}
	});

	switch (currentState || state.TASK_LIST) {
		case state.ACTION_ADD: return <Add/>;
		case state.ACTION_MENU: return <ActionMenu/>;
		case state.ACTION_SET_HOURS_PER_DAY: return <SetHoursPerDay/>;
		case state.TASK_ACTION_MENU: return <TaskActionMenu/>;
		case state.TASK_CHANGE_OBSERVATION: return <ChangeObservation/>;
		case state.TASK_ADJUST_TIME: return <AdjustTime/>;
		case state.TASK_CHANGE_NAME: return <ChangeName/>;
		case state.TASK_LIST: return <TaskList
			showInput={true}
		/>;
		default: return null;
	}
}

export default App;
