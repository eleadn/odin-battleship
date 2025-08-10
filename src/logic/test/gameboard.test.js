import Gameboard from "../gameboard";

describe("Gameboard tests", () => {
	describe("addShip tests", () => {
		it("Adding a single ship", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(0, 0, 2, false);
			expect(gameboard.totalShips).toBe(1);
		});

		it("Adding two ships", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(0, 0, 2, false);
			expect(gameboard.totalShips).toBe(1);
			gameboard.addShip(4, 1, 3, false);
			expect(gameboard.totalShips).toBe(2);
		});

		it("Adding a ship at wrong position", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(10, 0, 4, false);
			expect(gameboard.totalShips).toBe(0);
		});

		it("Adding a ship on top or crossing another", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(5, 3, 3, true);
			expect(gameboard.totalShips).toBe(1);
			gameboard.addShip(3, 4, 3, false);
			expect(gameboard.totalShips).toBe(1);
		});

		it("Adding a ship next to another", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(0, 0, 3, true);
			expect(gameboard.totalShips).toBe(1);
			gameboard.addShip(1, 0, 3, true);
			expect(gameboard.totalShips).toBe(1);
		});
	});

	describe("receiveAttack tests", () => {
		it("Missing a shot", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.totalAttacksCount).toBe(1);
			expect(gameboard.missedAttacks.length).toBe(1);
		});

		it("Shooting a ship", () => {
			const gameboard = new Gameboard(10);
			gameboard.addShip(0, 0, 3, false);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.totalAttacksCount).toBe(1);
			expect(gameboard.missedAttacks.length).toBe(0);
		});

		it("Shooting out of range", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(-1, 0);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
		});

		it("Shooting twice at the same place", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.totalAttacksCount).toBe(1);
			expect(gameboard.missedAttacks.length).toBe(1);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.totalAttacksCount).toBe(1);
			expect(gameboard.missedAttacks.length).toBe(1);
		});
	});

	describe("areAllShipSunk tests", () => {
		it("No ships", () => {
			const gameboard = new Gameboard(10);
			expect(gameboard.areAllShipSunk).toBeTruthy();
		});

		it("Not sunk ship", () => {
			const gameboard = new Gameboard(10);
			gameboard.addShip(0, 0, 3, false);
			expect(gameboard.areAllShipSunk).toBeFalsy();
		});

		it("Single sunk ship", () => {
			const gameboard = new Gameboard(10);
			gameboard.addShip(0, 0, 2, false);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(0, 0);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(1, 0);
			expect(gameboard.areAllShipSunk).toBeTruthy();
		});

		it("Two ships, one sunk", () => {
			const gameboard = new Gameboard(10);
			gameboard.addShip(0, 0, 2, false);
			gameboard.addShip(0, 2, 2, false);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(0, 0);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(1, 0);
			expect(gameboard.areAllShipSunk).toBeFalsy();
		});

		it("Two ships, all sunk", () => {
			const gameboard = new Gameboard(10);
			gameboard.addShip(0, 0, 2, false);
			gameboard.addShip(0, 2, 2, false);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(0, 0);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(1, 0);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(0, 2);
			expect(gameboard.areAllShipSunk).toBeFalsy();
			gameboard.receiveAttack(1, 2);
			expect(gameboard.areAllShipSunk).toBeTruthy();
		});
	});
});
