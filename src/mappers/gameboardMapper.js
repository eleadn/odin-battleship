export const gameboardMapper = {
	shipsToRaw: (gameboard) => {
		return gameboard.ships.map((s) => {
			const start = { x: s.position.x, y: s.position.y };
			const end = s.isUp
				? { x: s.position.x, y: s.position.y + s.length - 1 }
				: { x: s.position.x + s.length - 1, y: s.position.y };
			return { start, end };
		});
	},
};
