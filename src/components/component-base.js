export default class ComponentBase {
	#element;

	constructor(elementType) {
		this.#element = document.createElement(elementType);
	}

	get element() {
		return this.#element;
	}
}
