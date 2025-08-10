import { configuration } from "../configuration/configuration";
import EventBus from "../event-bus/event-bus";
import { SHIP_DIRECTION } from "../logic/battleship-constants";
import { gameboardMapper } from "../mappers/gameboardMapper";
import ScreenManager from "../screen-manager/screen-manager";
import { state } from "../state/state";

export default class GameflowController {
	constructor() {
		EventBus.listen("game:startRequest", () => this.onStartRequest());
	}

	#placeShips(gameboard) {
		const ships = configuration.getShips();
		gameboard.addShip(0, 0, ships["carrier"], SHIP_DIRECTION.UP);
		gameboard.addShip(2, 0, ships["battleship"], SHIP_DIRECTION.UP);
		gameboard.addShip(4, 0, ships["destroyer"], SHIP_DIRECTION.UP);
		gameboard.addShip(6, 0, ships["submarine"], SHIP_DIRECTION.UP);
		gameboard.addShip(8, 0, ships["patrolBoat"], SHIP_DIRECTION.UP);
	}

	onStartRequest() {
		this.#placeShips(state.players["player1"].gameboard);
		this.#placeShips(state.players["player2"].gameboard);
		ScreenManager.navigateToGameboard();
		EventBus.emit(
			"ui:shipPlacementChanged",
			gameboardMapper.shipsToRaw(state.players["player1"].gameboard)
		);
	}
}
