import Gameboard from "../logic/gameboard";

export const state = {
	players: {
		player1: {
			type: "human",
			gameboard: new Gameboard(),
		},
		player2: {
			type: "bot",
			gameboard: new Gameboard(),
		},
	},
};
