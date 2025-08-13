import EventBus from "../event-bus/event-bus";
import { gameboardMapper } from "../mappers/gameboardMapper";
import { playerType, state } from "../state/state";

export default class GameEventsController {
	constructor() {
		EventBus.listen("ui:opponentCellClicked", (p) =>
			this.onOpponentCellClicked(p)
		);
	}

	onOpponentCellClicked(cell) {
		if (state.players[state.currentPlayer].type === playerType.bot) {
			return;
		}

		const position = cell.position;

		state.players["player2"].gameboard.receiveAttack(
			position.x,
			position.y
		);

		EventBus.emit(
			"game:opponentReceiveAttack",
			gameboardMapper.attackToRaw(
				state.players["player2"].gameboard,
				position
			),
			cell
		);

		if (state.players["player2"].gameboard.areAllShipSunk) {
			EventBus.emit("game:endGame");
		} else {
			EventBus.emit("game:switchTurn");
		}
	}
}
