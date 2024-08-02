export const setRef = setter => ref => {
	if (ref) {
		setter(ref);
	}
};
