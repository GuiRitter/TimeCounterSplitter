import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';

import { navigate, setActive } from './flux/action';
import { getTaskProportionalRounded } from './flux/selector';

import { buildCell, buildRow } from './util/html';
import { round } from './util/math';

let moment = require('moment');

function Task(props) {

	const buildKey = key => `task_${props.task.name}_${key}`;

	const count = moment.duration(props.task.count).asHours();

	const dispatch = useDispatch();
	
	const observationVisible = useSelector(state => !!(((state || {}).reducer || {}).observationVisible && true));
	const proportional = useSelector(state => getTaskProportionalRounded(state, props) || {}).proportional;

	return <>{buildRow(
		buildCell(buildKey('start'), (!props.showInput) ? null : <input
			onClick={() => dispatch(setActive(props.task.name))}
			type='button'
			value='start'
		/>),
		buildCell(buildKey('name'), props.task.name),
		buildCell(buildKey('active'), props.task.active
			? 'active'
			: ''),
		buildCell(buildKey('count'), round(count, 1), { onClick: () => alert(count), title: count }),
		buildCell(buildKey('proportional'), props.task.ignored ? 'ignored' : round(proportional, 1), { onClick: () => alert(proportional), title: proportional }),
		buildCell(buildKey('lastStart'), props.task.lastStartedDateTime),
		buildCell(buildKey('lastStop'), props.task.lastStoppedDateTime),
		buildCell(buildKey('taskAction'), (!props.showInput) ? null : <input
			onClick={() => dispatch(navigate(state.TASK_ACTION_MENU, props.task.name))}
			type='button'
			value='action'
		/>)
	)}{(observationVisible && props.task.observation) ? buildRow(buildCell('observation', props.task.observation, { colSpan: 8 })) : null}</>;
}

export default Task;
