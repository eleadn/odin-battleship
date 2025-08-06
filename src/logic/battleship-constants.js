export const BOARD_SIZE = 10;

export const SHIP = (function () {
	const CARRIER = 5;
	const BATTLESHIP = 4;
	const DESTROYER = 3;
	const SUBMARINE = 3;
	const PATROL_BOAT = 2;

	return { CARRIER, BATTLESHIP, DESTROYER, SUBMARINE, PATROL_BOAT };
})();

export const SHIP_DIRECTION = (function () {
	const UP = 0;
	const SIDE = 1;

	return { UP, SIDE };
})();
