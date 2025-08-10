export default class Ship {
	#length;
	#hits;
	#position;
	#isUp;

	constructor(position, length, isUp) {
		this.#length = length;
		this.#hits = [];
		this.#position = position;
		this.#isUp = isUp;
	}

	get length() {
		return this.#length;
	}

	get hits() {
		return this.#hits;
	}

	get hitCount() {
		return this.#hits.length;
	}

	get position() {
		return this.#position;
	}

	get isUp() {
		return this.#isUp;
	}

	hit(hitIndex) {
		this.#hits.push(hitIndex);
	}

	isSunk() {
		return this.hitCount >= this.#length;
	}
}
