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

	attackToRaw: (gameboard, position) => {
		const attack = gameboard.attacks.find(
			(a) => a.position.x === position.x && a.position.y === position.y
		);
		let ship = null;

		if (attack.ship) {
			const sunk = attack.ship.isSunk();
			const shipPosition = {
				x: attack.ship.position.x,
				y: attack.ship.position.y,
			};
			const length = attack.ship.length;
			const isUp = attack.ship.isUp;
			ship = { sunk, position: shipPosition, length, isUp };
		}
		return { position, hit: attack.hit, ship };
	},
};
