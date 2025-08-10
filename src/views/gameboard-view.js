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
				cell.classList.add("cell-opponent");
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
		const axis = ship.isUp ? ship.position.x : ship.position.y;
		const segmentStart = ship.isUp ? ship.position.y : ship.position.x;
		const segmentEnd = segmentStart + ship.length;

		for (let i = segmentStart; i < segmentEnd; ++i) {
			const x = ship.isUp ? axis : i;
			const y = ship.isUp ? i : axis;
			const index = x + y * this.#boardSize;
			const shipElem = this.#board.children[index];

			const isHit = ship.hitIndexes.some(
				(ind) => ind === i - segmentStart
			);

			if (ship.isSunk) {
				shipElem.classList.add("ship-sunk");
			} else {
				if (isHit) {
					shipElem.classList.add("ship-hit");
				} else {
					shipElem.classList.add("ship");
				}
			}
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
