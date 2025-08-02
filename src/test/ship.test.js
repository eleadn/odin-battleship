import { SHIP, SHIP_DIRECTION } from "../battleship/battleship-constants";
import Ship from "../battleship/ship";

describe("Ship tests", () => {
	it("Should increment when hit is called", () => {
		const ship = new Ship(
			{ x: 0, y: 0 },
			SHIP.DESTROYER,
			SHIP_DIRECTION.SIDE
		);
		expect(ship.hits).toBe(0);
		ship.hit();
		expect(ship.hits).toBe(1);
		ship.hit();
		expect(ship.hits).toBe(2);
	});

	it("Should sunk when hit >= length", () => {
		const ship = new Ship(
			{ x: 0, y: 0 },
			SHIP.DESTROYER,
			SHIP_DIRECTION.SIDE
		);
		expect(ship.isSunk()).toBeFalsy();
		ship.hit();
		expect(ship.isSunk()).toBeFalsy();
		ship.hit();
		expect(ship.isSunk()).toBeTruthy();
	});
});
