import EventBus from "../event-bus/event-bus";
import ViewBase from "./view-base";

export default class EndgameView extends ViewBase {
	#winnerName;

	constructor(root, winnerName) {
		super(root);

		this.#winnerName = winnerName;
	}

	renderContent() {
		const container = document.createElement("div");
		container.id = "endgameView";

		const title = document.createElement("h1");
		title.textContent = `${this.#winnerName} wins !`;

		const replay = document.createElement("button");
		replay.textContent = "Replay";
		replay.addEventListener("click", () =>
			EventBus.emit("game:startRequest")
		);

		container.appendChild(title);
		container.appendChild(replay);

		this.root.appendChild(container);
	}
}
