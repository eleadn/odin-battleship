export default class ViewBase {
	#root;

	constructor(root) {
		this.#root = root;
	}

	get root() {
		return this.#root;
	}

	render() {
		if (typeof this.renderContent !== "function") {
			throw new Error("View must implement renderContent()");
		}

		this.#root.innerHTML = "";
		this.renderContent();
	}

	unRender() {}
}
