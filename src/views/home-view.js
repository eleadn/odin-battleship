import ButtonComponent from "../components/button-component";
import EventBus from "../event-bus/event-bus";
import ViewBase from "./view-base";

export default class HomeView extends ViewBase {
	constructor(root) {
		super(root);
	}

	#onPlayButtonClick() {
		EventBus.emit("home:playButtonClick");
	}

	renderContent() {
		const container = document.createElement("div");
		container.classList.add("homeView");

		const screenTitle = document.createElement("h1");
		screenTitle.textContent = "Battleship";

		const playButton = new ButtonComponent("Play", this.#onPlayButtonClick);

		container.appendChild(screenTitle);
		container.appendChild(playButton.element);

		this.root.appendChild(container);
	}
}
