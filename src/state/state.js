import { configuration } from "../configuration/configuration";
import Gameboard from "../logic/gameboard";

export const state = {
	players: {
		player1: {
			name: "Player",
			type: "human",
			gameboard: new Gameboard(configuration.getBoardSize()),
		},
		player2: {
			name: "Bot",
			type: "bot",
			gameboard: new Gameboard(configuration.getBoardSize()),
		},
	},
};
