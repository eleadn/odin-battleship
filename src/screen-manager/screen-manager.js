import HomeView from "../views/home-view";

export default class ScreenManager {
	static #rootElement;
	static #currentView;

	static init(rootElement) {
		this.#rootElement = rootElement;
	}

	static navigateToHome() {
		this.#currentView = new HomeView(this.#rootElement);
		this.#currentView.render();
	}
}
