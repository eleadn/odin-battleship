import EventBus from "../event-bus/event-bus";
import ViewBase from "./view-base";

export default class GameboardView extends ViewBase {
	#boardSize;
	#board;
	#opponentBoard;
	#title;

	#onUpdateShipBoard;
	#onOpponentReceiveAttack;
	#onPlayerReceiveAttack;
	#onStartTurn;

	#onOpponentCellClick;

	constructor(root, boardSize) {
		super(root);

		this.#boardSize = boardSize;

		this.#onUpdateShipBoard = (ships) => this.updateShipBoard(ships);
		this.#onOpponentReceiveAttack = (attacks) =>
			this.onOpponentReceiveAttack(attacks);
		this.#onPlayerReceiveAttack = (attack) =>
			this.onPlayerReceiveAttack(attack);
		this.#onStartTurn = (playerName) => this.updateTitle(playerName);

		EventBus.listen("game:shipPlacementChanged", this.#onUpdateShipBoard);
		EventBus.listen(
			"game:opponentReceiveAttack",
			this.#onOpponentReceiveAttack
		);
		EventBus.listen(
			"game:playerReceiveAttack",
			this.#onPlayerReceiveAttack
		);
		EventBus.listen("game:startTurn", this.#onStartTurn);

		this.#onOpponentCellClick = (cell) => this.#opponentCellClick(cell);
	}

	#opponentCellClick(event) {
		EventBus.emit("ui:opponentCellClicked", event.currentTarget);
	}

	#renderTitle(container) {
		const title = document.createElement("h2");
		title.textContent = "{CurrentPlayer} turn";

		container.appendChild(title);
		this.#title = title;
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

				cell.position = { x: j, y: i };

				cell.addEventListener("click", this.#onOpponentCellClick);

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

	#sinkShip(board, position, length, isUp) {
		const axis = isUp ? position.x : position.y;
		const segmentStart = isUp ? position.y : position.x;
		const segmentEnd = segmentStart + length;

		for (let i = segmentStart; i < segmentEnd; ++i) {
			const x = isUp ? axis : i;
			const y = isUp ? i : axis;
			const index = x + y * this.#boardSize;
			const cell = board.children[index];

			cell.classList.remove(["attack-hit", "attack-fail"]);
			cell.classList.add("attack-sunk");
		}
	}

	#receiveAttack(attack, board) {
		if (!board) {
			return;
		}

		const x = attack.position.x;
		const y = attack.position.y;
		const index = x + y * this.#boardSize;
		const cell = board.children[index];

		cell.classList.remove(["attack-hit", "attack-fail"]);

		if (attack.hit) {
			if (attack.ship.sunk) {
				this.#sinkShip(
					board,
					attack.ship.position,
					attack.ship.length,
					attack.ship.isUp
				);
			} else {
				cell.classList.add("attack-hit");
			}
		} else {
			cell.classList.add("attack-fail");
		}
	}

	unRender() {
		EventBus.unlisten("game:shipPlacementChanged", this.#onUpdateShipBoard);
		EventBus.unlisten(
			"game:opponentReceiveAttack",
			this.#onOpponentReceiveAttack
		);
		EventBus.unlisten(
			"game:playerReceiveAttack",
			this.#onPlayerReceiveAttack
		);
		EventBus.unlisten("game:startTurn", this.#onStartTurn);
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

	onOpponentReceiveAttack(attack, cell) {
		cell.removeEventListener("click", this.#onOpponentCellClick);
		this.#receiveAttack(attack, this.#opponentBoard);
	}

	onPlayerReceiveAttack(attack) {
		this.#receiveAttack(attack, this.#board);
	}

	updateTitle(playerName) {
		if (!this.#title) {
			return;
		}

		this.#title.textContent = `${playerName} turn`;
	}
}
