import ViewBase from "./view-base";

export default class GameboardView extends ViewBase {
	#boardSize;

	constructor(root, boardSize) {
		super(root);

		this.#boardSize = boardSize;
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
	}

	renderContent() {
		const container = document.createElement("div");
		container.id = "gameboardView";

		this.#renderTitle(container);
		this.#renderOpponentBoard(container);
		this.#renderFriendlyBoard(container);

		this.root.appendChild(container);
	}
}
