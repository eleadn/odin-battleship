export const configuration = (() => {
	const boardSize = 10;
	const ships = {
		carrier: 5,
		battleship: 4,
		destroyer: 3,
		submarine: 3,
		patrolBoat: 2,
	};

	const getBoardSize = () => boardSize;
	const getShips = () => new Object(...ships);

	return { getBoardSize, getShips };
})();
