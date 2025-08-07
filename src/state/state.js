import { BOARD_SIZE } from "../logic/battleship-constants";
import Gameboard from "../logic/gameboard";

export const GAMESTATE = {
	NONE: 0,
	INIT: 1,
};

export const state = {
	gameState: GAMESTATE.NONE,
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
