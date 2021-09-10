import { LOCAL_STORAGE_NAME } from '../constant/system';

export const updateLocalStorage = state => {
	localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state));
	return state;
}
