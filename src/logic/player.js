import Gameboard from "./gameboard";

export default class Player {
	#gameboard;

	constructor() {
		this.#gameboard = new Gameboard();
	}
}
