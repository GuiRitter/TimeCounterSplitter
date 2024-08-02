import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as state from './constant/state';
import { navigate, setActive } from './flux/action';

import { buildCell, buildRow } from './util/html';
import { round } from './util/math';

import Task from './Task';

let moment = require('moment');

function TaskList(props) {

	const dispatch = useDispatch();

	const hoursPerDay = useSelector(state => ((state || {}).reducer || {}).hoursPerDay || 0) || 0;
	const taskList = useSelector(state => ((state || {}).reducer || {}).taskList || []) || [];

	const countSum = (taskList || []).reduce((previousSum, currentTask) => previousSum + moment.duration((currentTask || {}).count || 0).asHours(), 0);

	const countSumFormula = (taskList || [])
		.map(task => moment.duration((task || {}).count || 0).asHours())
		.join(' + ');

	return <><table><tbody>{(!props.showInput) ? null : buildRow(
		buildCell('stop', <input
			onClick={() => dispatch(setActive(null))}
			type='button'
			value='stop'
		/>),
		buildCell('name', 'name'),
		buildCell('active'),
		buildCell('count', 'count'),
		buildCell('proportional', 'ratio'),
		buildCell('lastStart', 'last start'),
		buildCell('lastStop', 'last stop'),
		buildCell('action', (!props.showInput) ? null : <input
			onClick={() => dispatch(navigate(state.ACTION_MENU))}
			type='button'
			value='actions'
		/>)
	)}{(taskList || []).map(task => <Task
		key={task.name}
		showInput={props.showInput}
		task={task}
	/>)}{buildRow(
		buildCell('hoursPerDay', `count sum: ${round(countSum, 2)} — hours per day: ${hoursPerDay}`, { colSpan: 8, onClick: () => alert(countSumFormula) })
	)}</tbody></table></>;
}

export default TaskList;
