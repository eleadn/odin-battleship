import { BOARD_SIZE, SHIP_DIRECTION } from "./battleship-constants";
import Ship from "./ship";

export default class Gameboard {
	#ships;
	#attacks;

	constructor() {
		this.#ships = [];
		this.#attacks = [];
	}

	get totalShips() {
		return this.#ships.length;
	}

	get totalAttacksCount() {
		return this.#attacks.length;
	}

	get missedAttacks() {
		return this.#attacks.filter((a) => !a.hit);
	}

	addShip(positionX, positionY, shipLength, direction) {
		const position = { x: positionX, y: positionY };

		if (
			!this.#isPositionInsideBoard(position.x) ||
			!this.#isPositionInsideBoard(position.y)
		) {
			return;
		}

		if (
			direction === SHIP_DIRECTION.UP &&
			this.#isPositionInsideBoard(position.y + shipLength)
		) {
			this.#addShip(position, shipLength, direction);
		} else if (this.#isPositionInsideBoard(position.x + shipLength)) {
			this.#addShip(position, shipLength, direction);
		}
	}

	receiveAttack(positionX, positionY) {
		const position = { x: positionX, y: positionY };
		if (
			position.x < 0 ||
			position.x >= BOARD_SIZE ||
			position.y < 0 ||
			position.y >= BOARD_SIZE ||
			this.#attacks.some(
				(a) =>
					a.position.x === position.x && a.position.y === position.y
			)
		) {
			return;
		}

		const isHit = this.#ships.some((s) => this.#testShipHit(s, position));
		this.#attacks.push({ position: position, hit: isHit });
	}

	#testShipHit(ship, hitPosition) {
		const isShipVertical = ship.direction === SHIP_DIRECTION.UP;
		const shipAxis = isShipVertical ? ship.position.x : ship.position.y;
		const shipSegment = isShipVertical ? ship.position.y : ship.position.x;
		const shipSegmentEnd = shipSegment + ship.length;
		const hitAxis = isShipVertical ? hitPosition.x : hitPosition.y;
		const hitSegment = isShipVertical ? hitPosition.y : hitPosition.x;

		if (
			shipAxis === hitAxis &&
			shipSegment <= hitSegment &&
			hitSegment <= shipSegmentEnd
		) {
			ship.hit();
			return true;
		}

		return false;
	}

	#isPositionInsideBoard(position) {
		return position >= 0 && position < BOARD_SIZE;
	}

	#addShip(position, shipLength, direction) {
		const ship = new Ship(position, shipLength, direction);
		if (!this.#isNearOrIntersectingWithShip(ship)) {
			this.#ships.push(ship);
		}
	}

	#isNearOrIntersectingWithShip(ship) {
		return this.#ships.some((s) => this.#isNearOrIntersecting(ship, s));
	}

	#isNearOrIntersecting(ship1, ship2) {
		if (ship1.direction !== ship2.direction) {
			return this.#isNearOrIntersectingDifferentDirection(ship1, ship2);
		} else {
			return this.#isNearOrIntersectingSameDirection(ship1, ship2);
		}
	}

	#isNearOrIntersectingDifferentDirection(ship1, ship2) {
		const isShip1Vertical = ship1.direction === SHIP_DIRECTION.UP;
		const vertical = isShip1Vertical ? ship1 : ship2;
		const horizontal = isShip1Vertical ? ship2 : ship1;

		const horizontalLeft = horizontal.position.x - vertical.position.x;
		const horizontalEnd = horizontal.position.x + horizontal.length - 1;
		const horizontalRight = vertical.position.x - horizontalEnd;
		const horizontalMax = Math.max(horizontalLeft, horizontalRight);
		const horizontalDistance = Math.max(0, horizontalMax);

		const verticalUp = vertical.position.y - horizontal.position.y;
		const verticalEnd = vertical.position.y + vertical.length - 1;
		const verticalDown = horizontal.position.y - verticalEnd;
		const verticalMax = Math.max(verticalUp, verticalDown);
		const verticalDistance = Math.max(0, verticalMax);

		if (horizontalDistance > 0 && verticalDistance > 0) {
			return horizontalDistance + verticalDistance <= 2;
		} else {
			return horizontalDistance + verticalDistance <= 1;
		}
	}

	#isNearOrIntersectingSameDirection(ship1, ship2) {
		const isVertical = ship1.direction === SHIP_DIRECTION.UP;
		const ship1Axis = isVertical ? ship1.position.x : ship1.position.y;
		const ship2Axis = isVertical ? ship2.position.x : ship2.position.y;
		const ship1Segment = isVertical ? ship1.position.y : ship1.position.x;
		const ship2Segment = isVertical ? ship2.position.y : ship2.position.x;

		const axisDistance = Math.abs(ship1Axis - ship2Axis);

		const ship1SegmentEnd = ship1Segment + ship1.length - 1;
		const ship2SegmentEnd = ship2Segment + ship2.length - 1;
		const shipSegmentMax = Math.max(ship1Segment, ship2Segment);
		const shipSegmentEndMin = Math.min(ship1SegmentEnd, ship2SegmentEnd);
		const segmentDistance = Math.max(0, shipSegmentMax - shipSegmentEndMin);

		if (axisDistance > 0 && segmentDistance > 0) {
			return axisDistance + segmentDistance <= 2;
		} else {
			return axisDistance + segmentDistance <= 1;
		}
	}
}
