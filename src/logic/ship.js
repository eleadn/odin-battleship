export default class Ship {
	#length;
	#hits;
	#position;
	#isUp;

	constructor(position, length, isUp) {
		this.#length = length;
		this.#hits = 0;
		this.#position = position;
		this.#isUp = isUp;
	}

	get length() {
		return this.#length;
	}

	get hits() {
		return this.#hits;
	}

	get position() {
		return this.#position;
	}

	get isUp() {
		return this.#isUp;
	}

	hit() {
		++this.#hits;
	}

	isSunk() {
		return this.#hits >= this.#length;
	}
}
