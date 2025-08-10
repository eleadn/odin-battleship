import EventBus from "../event-bus/event-bus";
import ViewBase from "./view-base";

export default class GameboardView extends ViewBase {
	#boardSize;
	#board;

	#onUpdateShipBoard;

	constructor(root, boardSize) {
		super(root);

		this.#boardSize = boardSize;

		this.#onUpdateShipBoard = (ships) => this.updateShipBoard(ships);
		EventBus.listen("ui:shipPlacementChanged", this.#onUpdateShipBoard);
	}

	#renderTitle(container) {
		const title = document.createElement("h2");
		title.textContent = "{CurrentPlayer} turn";

		container.appendChild(title);
	}

	#renderOpponentBoard(container) {
		const board = document.createElement("div");
		board.classList.add("board");

		for (let i = 0; i < this.#boardSize; ++i) {
			for (let j = 0; j < this.#boardSize; ++j) {
				const cell = document.createElement("button");
				cell.classList.add("cell-oponent");
				if (j === 0) {
					cell.classList.add("cell-left");
				}
				if (i === 0) {
					cell.classList.add("cell-top");
				}

				board.appendChild(cell);
			}
		}

		container.appendChild(board);
	}

	#renderFriendlyBoard(container) {
		const board = document.createElement("div");
		board.classList.add("board");

		for (let i = 0; i < this.#boardSize; ++i) {
			for (let j = 0; j < this.#boardSize; ++j) {
				const cell = document.createElement("div");
				cell.classList.add("cell-friendly");
				if (j === 0) {
					cell.classList.add("cell-left");
				}
				if (i === 0) {
					cell.classList.add("cell-top");
				}

				board.appendChild(cell);
			}
		}

		container.appendChild(board);
		this.#board = board;
	}

	unRender() {
		EventBus.unlisten("ui:shipPlacementChanged", this.#onUpdateShipBoard);
	}

	renderContent() {
		const container = document.createElement("div");
		container.id = "gameboardView";

		this.#renderTitle(container);
		this.#renderOpponentBoard(container);
		this.#renderFriendlyBoard(container);

		this.root.appendChild(container);
	}

	#updateShipBoard(ship) {
		const isVertical = ship.start.x === ship.end.x;
		const axis = isVertical ? ship.start.x : ship.start.y;
		const segmentStart = isVertical ? ship.start.y : ship.start.x;
		const segmentEnd = isVertical ? ship.end.y : ship.end.x;

		for (let i = segmentStart; i <= segmentEnd; ++i) {
			const x = isVertical ? axis : i;
			const y = isVertical ? i : axis;
			const index = x + y * this.#boardSize;
			this.#board.children[index].textContent = "X";
		}
	}

	updateShipBoard(shipsArray) {
		if (!this.#board) {
			return;
		}

		for (const s of shipsArray) {
			this.#updateShipBoard(s);
		}
	}
}
