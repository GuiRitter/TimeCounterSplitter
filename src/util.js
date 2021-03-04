import React from "react";

import { LOCAL_STORAGE_NAME } from './constant/system';

export const buildCell = (key, content, attributes) => <td
	{...attributes}
	key={key}
>{content}</td>;

export const buildRow = (...cellList) => <tr>{cellList}</tr>;

export const round = (value, digits) => Math.floor(value * (10 ** digits)) / (10 ** digits);

export const updateLocalStorage = state => {
	localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state));
	return state;
}

export const isNumberOrNumberAsString = input => (!isNaN(parseFloat(input))) && isFinite(input);
