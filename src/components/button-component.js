import ComponentBase from "./component-base";

export default class ButtonComponent extends ComponentBase {
	constructor(label, onClick) {
		if (typeof label !== "string") {
			throw new TypeError("ButtonComponent: label must be a string");
		}
		if (onClick && typeof onClick !== "function") {
			throw new TypeError("ButtonComponent: onClick must be a function");
		}

		super("button");

		this.element.textContent = label;
		if (onClick) {
			this.element.addEventListener("click", onClick);
		}
	}
}
