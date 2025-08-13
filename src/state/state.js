import { configuration } from "../configuration/configuration";
import Gameboard from "../logic/gameboard";

export const playerType = {
	human: "human",
	bot: "bot",
};

const players = {
	player1: {
		name: "Player",
		type: playerType.human,
		gameboard: new Gameboard(configuration.getBoardSize()),
	},
	player2: {
		name: "Bot",
		type: playerType.bot,
		gameboard: new Gameboard(configuration.getBoardSize()),
	},
};

export const state = {
	players,
	currentPlayer: "player1",
};

export const initState = function () {
	players.player1.gameboard = new Gameboard(configuration.getBoardSize());
	players.player2.gameboard = new Gameboard(configuration.getBoardSize());
};
