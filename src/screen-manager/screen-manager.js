import { configuration } from "../configuration/configuration";
import GameboardView from "../views/gameboard-view";
import HomeView from "../views/home-view";

export default class ScreenManager {
	static #rootElement;
	static #currentView;

	static init(rootElement) {
		this.#rootElement = rootElement;
	}

	static #unRenderCurrentView() {
		if (this.#currentView) {
			this.#currentView.unRender();
		}
	}

	static navigateToHome() {
		this.#unRenderCurrentView();
		this.#currentView = new HomeView(this.#rootElement);
		this.#currentView.render();
	}

	static navigateToGameboard() {
		this.#unRenderCurrentView();
		this.#currentView = new GameboardView(
			this.#rootElement,
			configuration.getBoardSize()
		);
		this.#currentView.render();
	}
}
