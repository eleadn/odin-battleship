import EventBus from "../event-bus/event-bus";
import ViewBase from "./view-base";

export default class GameboardView extends ViewBase {
	#boardSize;
	#board;
	#opponentBoard;

	#onUpdateShipBoard;
	#onReceiveAttack;

	constructor(root, boardSize) {
		super(root);

		this.#boardSize = boardSize;

		this.#onUpdateShipBoard = (ships) => this.updateShipBoard(ships);
		this.#onReceiveAttack = (attacks) => this.receiveAttack(attacks);
		EventBus.listen("game:shipPlacementChanged", this.#onUpdateShipBoard);
		EventBus.listen("game:opponentReceiveAttack", this.#onReceiveAttack);
	}

	#onOpponentCellClick(position) {
		EventBus.emit("ui:opponentCellClicked", position);
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
				cell.role = "none";
				cell.classList.add("cell-opponent");
				if (j === 0) {
					cell.classList.add("cell-left");
				}
				if (i === 0) {
					cell.classList.add("cell-top");
				}

				cell.position = { x: j, y: i };

				cell.addEventListener("click", () =>
					this.#onOpponentCellClick(cell.position)
				);

				board.appendChild(cell);
			}
		}

		container.appendChild(board);
		this.#opponentBoard = board;
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

			shipElem.classList.remove(["ship-sunk", "ship-hit", "ship"]);

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

	#sinkOpponentShip(position, length, isUp) {
		const axis = isUp ? position.x : position.y;
		const segmentStart = isUp ? position.y : position.x;
		const segmentEnd = segmentStart + length;

		for (let i = segmentStart; i < segmentEnd; ++i) {
			const x = isUp ? axis : i;
			const y = isUp ? i : axis;
			const index = x + y * this.#boardSize;
			const cell = this.#opponentBoard.children[index];

			cell.classList.remove(["attack-hit", "attack-fail"]);
			cell.classList.add("attack-sunk");
		}
	}

	unRender() {
		EventBus.unlisten("game:shipPlacementChanged", this.#onUpdateShipBoard);
		EventBus.unlisten("game:opponentReceiveAttack", this.#onReceiveAttack);
	}

	renderContent() {
		const container = document.createElement("div");
		container.id = "gameboardView";

		this.#renderTitle(container);
		this.#renderOpponentBoard(container);
		this.#renderFriendlyBoard(container);

		this.root.appendChild(container);
	}

	updateShipBoard(shipsArray) {
		if (!this.#board) {
			return;
		}

		for (const s of shipsArray) {
			this.#updateShipBoard(s);
		}
	}

	receiveAttack(attack) {
		if (!this.#opponentBoard) {
			return;
		}

		const x = attack.position.x;
		const y = attack.position.y;
		const index = x + y * this.#boardSize;
		const cell = this.#opponentBoard.children[index];

		cell.classList.remove(["attack-hit", "attack-fail"]);

		if (attack.ship.sunk) {
			this.#sinkOpponentShip(
				attack.ship.position,
				attack.ship.length,
				attack.ship.isUp
			);
		} else {
			if (attack.hit) {
				cell.classList.add("attack-hit");
			} else {
				cell.classList.add("attack-fail");
			}
		}
	}
}
