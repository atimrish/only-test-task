export const debounce = <T extends any[]>(cb: (...args: T) => void, ms: number): () => void => {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return (...args: T) => {
		clearTimeout(timeout);
		timeout = setTimeout(cb, ms, ...args);
	};
};
