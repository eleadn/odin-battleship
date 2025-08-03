import { SHIP, SHIP_DIRECTION } from "../battleship/battleship-constants";
import Gameboard from "../battleship/gameboard";

describe("Gameboard tests", () => {
	describe("addShip tests", () => {
		it("Adding a single ship", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(0, 0, SHIP.PATROL_BOAT, SHIP_DIRECTION.SIDE);
			expect(gameboard.totalShips).toBe(1);
		});

		it("Adding two ships", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(0, 0, SHIP.PATROL_BOAT, SHIP_DIRECTION.SIDE);
			expect(gameboard.totalShips).toBe(1);
			gameboard.addShip(4, 1, SHIP.SUBMARINE, SHIP_DIRECTION.SIDE);
			expect(gameboard.totalShips).toBe(2);
		});

		it("Adding a ship at wrong position", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(10, 0, SHIP.BATTLESHIP, SHIP_DIRECTION.SIDE);
			expect(gameboard.totalShips).toBe(0);
		});

		it("Adding a ship on top or crossing another", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(5, 3, SHIP.DESTROYER, SHIP_DIRECTION.UP);
			expect(gameboard.totalShips).toBe(1);
			gameboard.addShip(3, 4, SHIP.SUBMARINE, SHIP_DIRECTION.SIDE);
			expect(gameboard.totalShips).toBe(1);
		});

		it("Adding a ship next to another", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalShips).toBe(0);
			gameboard.addShip(0, 0, SHIP.DESTROYER, SHIP_DIRECTION.UP);
			expect(gameboard.totalShips).toBe(1);
			gameboard.addShip(1, 0, SHIP.SUBMARINE, SHIP_DIRECTION.UP);
			expect(gameboard.totalShips).toBe(1);
		});
	});

	describe("receiveAttack tests", () => {
		it("Missing a shot", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.totalAttacksCount).toBe(1);
			expect(gameboard.missedAttacks.length).toBe(1);
		});

		it("Shooting a ship", () => {
			const gameboard = new Gameboard();
			gameboard.addShip(0, 0, SHIP.SUBMARINE, SHIP_DIRECTION.SIDE);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.totalAttacksCount).toBe(1);
			expect(gameboard.missedAttacks.length).toBe(0);
		});

		it("Shooting out of range", () => {
			const gameboard = new Gameboard();
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
			gameboard.receiveAttack(-1, 0);
			expect(gameboard.totalAttacksCount).toBe(0);
			expect(gameboard.missedAttacks.length).toBe(0);
		});

		it("Shooting twice at the same place", () => {
			const gameboard = new Gameboard();
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
});
