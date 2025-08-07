export default class EventBus {
	static #listeners = new Map();

	static listen(signal, callback) {
		const list = this.#listeners.get(signal) ?? [];
		list.push(callback);
		this.#listeners.set(signal, list);
	}

	static unlisten(signal, callback) {
		const list = this.#listeners.get(signal);
		if (list !== undefined) {
			this.#listeners.set(
				signal,
				list.filter((cb) => cb !== callback)
			);
		}
	}

	static emit(signal, ...args) {
		const events = this.#listeners.get(signal);
		if (events !== undefined) {
			for (const callback of events) {
				callback(...args);
			}
		}
	}

	static query(signal, ...args) {
		const events = this.#listeners.get(signal);
		if (events?.length > 0) {
			if (events?.length > 1) {
				console.warn(
					`EventBus.query(${signal}) called but multiple handlers are registered.`
				);
			}
			return events[0](...args);
		}
	}
}
