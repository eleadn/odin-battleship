import { configuration } from "../configuration/configuration";
import EventBus from "../event-bus/event-bus";
import { gameboardMapper } from "../mappers/gameboardMapper";
import ScreenManager from "../screen-manager/screen-manager";
import { playerType, state } from "../state/state";

export default class GameflowController {
	constructor() {
		EventBus.listen("game:startRequest", () => this.onStartRequest());
		EventBus.listen("game:startTurn", (n) => this.onTurnStart(n));
		EventBus.listen("game:switchTurn", () => this.onSwitchTurn());
	}

	#placeShips(gameboard) {
		const ships = configuration.getShips();
		gameboard.addShip(0, 0, ships["carrier"], true);
		gameboard.addShip(2, 0, ships["battleship"], true);
		gameboard.addShip(4, 0, ships["destroyer"], true);
		gameboard.addShip(6, 0, ships["submarine"], true);
		gameboard.addShip(8, 0, ships["patrolBoat"], true);
	}

	onStartRequest() {
		this.#placeShips(state.players["player1"].gameboard);
		this.#placeShips(state.players["player2"].gameboard);
		ScreenManager.navigateToGameboard();

		const boardToRender =
			state.currentPlayer.type === "human"
				? state.currentPlayer.gameboard
				: state.players["player1"].gameboard;
		EventBus.emit(
			"game:shipPlacementChanged",
			gameboardMapper.shipsToRaw(boardToRender)
		);
		EventBus.emit("game:startTurn", state.currentPlayer.name);
	}

	onTurnStart() {
		if (state.currentPlayer.type === playerType.bot) {
			EventBus.emit("game:playBotTurn");
		}
	}

	onSwitchTurn() {
		if (state.currentPlayer.type === playerType.bot) {
			state.currentPlayer = state.players["player1"];
		} else {
			state.currentPlayer = state.players["player2"];
		}

		EventBus.emit("game:startTurn", state.currentPlayer.name);
	}
}
