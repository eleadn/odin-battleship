import { configuration } from "../configuration/configuration";
import EventBus from "../event-bus/event-bus";
import { gameboardMapper } from "../mappers/gameboardMapper";
import ScreenManager from "../screen-manager/screen-manager";
import { initState, playerType, state } from "../state/state";

export default class GameflowController {
	constructor() {
		EventBus.listen("game:startRequest", () => this.onStartRequest());
		EventBus.listen("game:startTurn", (n) => this.onTurnStart(n));
		EventBus.listen("game:switchTurn", () => this.onSwitchTurn());
		EventBus.listen("game:endGame", () => this.onEndGame());
	}

	#placeShip(gameboard, shipLength) {
		const possibilities = gameboard.getPossiblePositions(shipLength);

		if (possibilities.length === 0) {
			return;
		}

		const index = Math.floor(Math.random() * possibilities.length);
		const ship = possibilities[index];
		gameboard.addShip(
			ship.position.x,
			ship.position.y,
			ship.length,
			ship.isUp
		);
	}

	#placeShips(gameboard) {
		const ships = configuration.getShips();
		this.#placeShip(gameboard, ships["carrier"]);
		this.#placeShip(gameboard, ships["battleship"]);
		this.#placeShip(gameboard, ships["destroyer"]);
		this.#placeShip(gameboard, ships["submarine"]);
		this.#placeShip(gameboard, ships["patrolBoat"]);
	}

	onStartRequest() {
		initState();

		this.#placeShips(state.players["player1"].gameboard);
		this.#placeShips(state.players["player2"].gameboard);
		ScreenManager.navigateToGameboard();

		const boardToRender =
			state.players[state.currentPlayer].type === "human"
				? state.players[state.currentPlayer].gameboard
				: state.players["player1"].gameboard;
		EventBus.emit(
			"game:shipPlacementChanged",
			gameboardMapper.shipsToRaw(boardToRender)
		);
		EventBus.emit(
			"game:startTurn",
			state.players[state.currentPlayer].name
		);
	}

	onTurnStart() {
		if (state.players[state.currentPlayer].type === playerType.bot) {
			EventBus.emit("game:playBotTurn");
		}
	}

	onSwitchTurn() {
		if (state.currentPlayer === "player1") {
			state.currentPlayer = "player2";
		} else {
			state.currentPlayer = "player1";
		}

		EventBus.emit(
			"game:startTurn",
			state.players[state.currentPlayer].name
		);
	}

	onEndGame() {
		ScreenManager.navigateToEndgame(
			state.players[state.currentPlayer].name
		);
	}
}
