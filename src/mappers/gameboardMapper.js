export const gameboardMapper = {
	shipsToRaw: (gameboard) => {
		return gameboard.ships.map((s) => {
			const position = { x: s.position.x, y: s.position.y };
			const length = s.length;
			const isUp = s.isUp;
			return { position, length, isUp };
		});
	},
};
