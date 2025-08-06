export default class Ship {
	#length;
	#hits;
	#position;
	#direction;

	constructor(position, length, direction) {
		this.#length = length;
		this.#hits = 0;
		this.#position = position;
		this.#direction = direction;
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

	get direction() {
		return this.#direction;
	}

	hit() {
		++this.#hits;
	}

	isSunk() {
		return this.#hits >= this.#length;
	}
}
