import Ship from "../ship";

describe("Ship tests", () => {
	it("Should increment when hit is called", () => {
		const ship = new Ship({ x: 0, y: 0 }, 2, false);
		expect(ship.hitCount).toBe(0);
		ship.hit();
		expect(ship.hitCount).toBe(1);
		ship.hit();
		expect(ship.hitCount).toBe(2);
	});

	it("Should sunk when hit >= length", () => {
		const ship = new Ship({ x: 0, y: 0 }, 2, false);
		expect(ship.isSunk()).toBeFalsy();
		ship.hit();
		expect(ship.isSunk()).toBeFalsy();
		ship.hit();
		expect(ship.isSunk()).toBeTruthy();
	});
});
