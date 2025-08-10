import { configuration } from "../configuration/configuration";
import Gameboard from "../logic/gameboard";

export const state = {
	players: {
		player1: {
			type: "human",
			gameboard: new Gameboard(configuration.getBoardSize()),
		},
		player2: {
			type: "bot",
			gameboard: new Gameboard(configuration.getBoardSize()),
		},
	},
};
