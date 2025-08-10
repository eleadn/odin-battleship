export const gameboardMapper = {
	shipsToRaw: (gameboard) => {
		return gameboard.ships.map((s) => {
			const position = { x: s.position.x, y: s.position.y };
			const length = s.length;
			const isUp = s.isUp;
			const hitIndexes = s.hits;
			const sunk = s.isSunk();
			return { position, length, isUp, hitIndexes, sunk };
		});
	},
};
